from mq import *
import sys, time, mysql.connector

def check(cursor, id, name):
  cursor.execute('select * from readings where id = %g' % (id))
  result = cursor.fetchall()
  if not result:
    value = 0.0
    highestValue = 100.0
    cursor.execute('insert into readings (id, label, value, unit, highestValue) values (%i, "%s", %i, "ppm", %i)' % (id, name, value, highestValue))

def update(id, value):
  cursor.execute('UPDATE readings SET value = format(%s, 8) WHERE id = %i' % (str(value), id))

# Connect to server on localhost
conn = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="root",
  database="manhattan"
)

cursor = conn.cursor()

#get entries / create them if they don't exist
check(cursor, 1, 'LPG')
check(cursor, 2, 'CO')
check(cursor, 3, 'Rauch')

conn.commit()

try:
    print("Press CTRL+C to abort.")
    
    mq = MQ()
    while True:
        perc = mq.MQPercentage()
        update(1, perc["GAS_LPG"])
        update(2, perc["CO"])
        update(3, perc["SMOKE"])
        conn.commit()
        sys.stdout.write("\r")
        sys.stdout.write("\033[K")
        sys.stdout.write("LPG: %g ppm, CO: %g ppm, Smoke: %g ppm" % (perc["GAS_LPG"], perc["CO"], perc["SMOKE"]))
        sys.stdout.flush()
        time.sleep(1)

except:
    print("\nAbort by user")
    conn.close()
