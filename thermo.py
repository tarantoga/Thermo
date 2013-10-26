import sys, time
import serial
import sqlite3
import urllib
from time import sleep
from datetime import datetime
from daemon import runner

class App():
	
	def __init__(self):
		self.stdin_path = '/dev/null'
		self.stdout_path = '/tmp/thermo.log'
		self.stderr_path = '/tmp/thermo.log'
		self.pidfile_path = '/tmp/thermo.pid'
		self.pidfile_timeout = 5
		
	def run(self):
		urlSample = 'http://localhost:1337/sample/create'
		urlDevice = 'http://localhost:1337/device/set'
		cn = sqlite3.connect("/home/pi/projects/thermo/thermo.db", detect_types=sqlite3.PARSE_DECLTYPES|sqlite3.PARSE_COLNAMES)
		c = cn.cursor()
		ser = serial.Serial('/dev/ttyAMA0', 9600)
		while True:	
			data = ser.read(12)
			now = datetime.now()
			c.execute('INSERT INTO xrf VALUES (?, ?)', (now, data))
			cn.commit()

			sensor = data[1:3]
			command = data[3:]
			if command.startswith('TMPA'):
				stmp = data[-5:]
				ftmp = float(stmp)
				c.execute('INSERT INTO data VALUES (?, ?, ?)', (now, sensor, ftmp))
				cn.commit()
				params = urllib.urlencode({
								  'device': sensor,
								  'value': ftmp,
								  })
				data = urllib.urlopen(urlSample, params).read()
			elif command.startswith('BATT'):
				sbatt = data[-5:-1]
				fbatt = float(sbatt)
				c.execute('SELECT count(*) FROM sensor WHERE sensor = ?', (sensor,))
				retval = c.fetchone()[0]
				if retval == 0:
					c.execute('INSERT INTO sensor VALUES (?, ?)', (sensor, fbatt))
					cn.commit()
				else:
					c.execute('UPDATE sensor SET batt=? WHERE sensor=?', (fbatt, sensor))
					cn.commit()
				params = urllib.urlencode({
								'name': sensor,
								'batt': fbatt,
								})
				data = urllib.urlopen(urlDevice, params).read()
					
app = App()
daemon_runner = runner.DaemonRunner(app)
daemon_runner.do_action()

