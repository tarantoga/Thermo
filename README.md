# testSails
This test Sails.js application actually has turned into a working project running on my RaspberryPi.
I am using it to gather temperature samples from xrf sensor (via python script) 
and display current temperature (latest sample). 
Every time new sample is acquired displayed value is updated (using websockets).
Currently one sensor's value is displayed (gathering of data from multiple sensors is supported thou).
#####TODOs:
- add battery level display
- add graph for last 24 hours, last week, etc.
- add more sensors support
