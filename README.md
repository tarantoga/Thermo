# Thermo
This Sails.js application is running on my RaspberryPi and gathers temperature samples from xrf sensor (via python script) 
and displays current temperature (latest sample). 
Every time new sample is acquired displayed value is updated (using websockets).
Currently one sensor's value is displayed (gathering of data from multiple sensors is supported thou).
#####TODOs:
- add sensor's battery level display
- add more sensors support
