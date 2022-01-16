import datetime
import psycopg2 as pg2
import schedule
import time
import os
import subprocess
import requests
from auth import conn
import json

conn = pg2.connect(database=conn["dbName"], user=conn["dbUser"],
                   password=conn["dbPass"], host=conn["dbHost"], port=conn["dbPort"])
conn.autocommit = True
cursor = conn.cursor()


def insertDb(dat):
    ts = f"{dat[1][4:8]}-{dat[1][2:4]}-{dat[1][0:2]}"
    h = ''
    a = int(dat[2])
    if (a + 7) > 12:
        h = '00'
    else:
        b = a + 7
        if b >= 10:
            h = str(b)

    sql = '''INSERT INTO dataset(stat_code, dd, hh, mm, ts, de, dn, dh, status)VALUES(
        '{station}','{dd}','{hh}','{mm}','{ddmmyy} {hh}:{mm}',{de},{dn},{dz},{status})'''.format(
        station=dat[0], dd=dat[1], hh=h, mm=dat[3], ddmmyy=ts, de=dat[4], dn=dat[5], dz=dat[6], status=dat[7].rstrip("\n"))
    # cursor.execute(sql)
    print(sql)

    url = 'http://localhost:3000/api/update_db'
    myobj = {'sql': sql}
    x = requests.post(url, data=myobj)
    print(x.content)


def checkData(dat):
    ts = f"{dat[1][4:8]}-{dat[1][2:4]}-{dat[1][0:2]}"
    if int(dat[1][4:8]) < 1 or int(dat[1][2:4]) < 1 or int(dat[1][0:2]) < 1:
        print('errer', ts)
    else:
        print(ts)
        insertDb(dat)


def readFile():
    a = os.getcwd()
    files = open(a + "/service/output1.dat", "r+")
    for f in files:
        f.strip()
        arr = f.split(" ")
        arr = list(filter(None, arr))
        checkData(arr)


def runExe():
    # subprocess.Popen(["readubx.exe"],
    # stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True).communicate()
    print("readFile")
    readFile()


def runSched():
    runExe()

    print("runSched")
    # conn.commit()
    # conn.close()


if __name__ == "__main__":
    schedule.every(5).seconds.do(runSched)
    while True:
        schedule.run_pending()
        time.sleep(1)
