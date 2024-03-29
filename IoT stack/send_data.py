'''
Enter data as a device would using the iot topic
'''
import boto3
import json

# Connect to IOT
TOPIC_BASE = 'dev-krea/sensor'
C_IOT_DATA = boto3.client('iot-data', region_name='us-east-1')

# Sample data
SENSORS = {"cathode": "1", "current": 900, 'electrolyte': 60, "client": "2",
           "cell": "2"
           }

# The number to identify the sensor

sensor = 23
topic = '{}/{}'.format(TOPIC_BASE, sensor)

response = C_IOT_DATA.publish(topic=topic, qos=0, payload=json.dumps(SENSORS))
