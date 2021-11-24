import datetime
import psycopg2 as pg2
import schedule
import time
import os
import subprocess
import requests
from auth import conn


conn = pg2.connect(database=conn["dbName"], user=conn["dbUser"],
                   password=conn["dbPass"], host=conn["dbHost"], port=conn["dbPort"])
conn.autocommit = True
cursor = conn.cursor()


def readStatus(station, status):
    station = station
    status = status
    status_text = ""
    print(f"{station} {status}")

    if status == 1:
        print("เปิด เหลือง")
        status_text = "Movement is low (10-20 cm)"
        #requests.get(f'http://rtk{station}.dyndns.org/rpidata/setRelay/?cha=3&onoff=1')
    elif status == 2:
        print("เปิด แดง")
        status_text = "Movement is medium (20-30cm)"
        #requests.get(f"http://rtk{station}.dyndns.org/rpidata/setRelay/?cha=3&onoff=1")
    elif status == 3:
        print("เปิด เหลือง")
        status_text = "Movement is high (more than 30cm)"
        #requests.get(f"http://rtk{station}.dyndns.org/rpidata/setRelay/?cha=3&onoff=1")

    elif status == 4:
        status_text = "System failures"
        #requests.get(f"http://25.81.83.49/rpidata/setRelay/?cha=3&onoff=1")

    # send to LINE
    # requests.post('https://localhost/multicast', data={'key': status_text})


def selectData(station):
    # ts = f"{dat[1][4:8]}-{dat[1][2:4]}-{dat[1][0:2]}"
    sql = f"""SELECT stat_code, status FROM dataset d
                WHERE ts = (SELECT MAX(ts) FROM dataset e WHERE e.stat_code = '{station}')  
                AND d.stat_code = '{station}' """
    cursor.execute(sql)
    fetrecords = cursor.fetchall()
    print(fetrecords[0][0])
    readStatus(station, fetrecords[0][1])


def runSched(station):
    print(f"station: {station}")
    selectData(str(station))


if __name__ == "__main__":
    station = input("station name: ")

    schedule.every(10).seconds.do(runSched, station)
    while True:
        schedule.run_pending()
        time.sleep(1)