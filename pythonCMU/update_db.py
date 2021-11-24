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
    sql = '''INSERT INTO dataset(stat_code, dd, hh, mm, ts, de, dn, dh, status)VALUES(
        '{station}','{dd}','{hh}','{mm}','{ddmmyy} {hh}:{mm}',{de},{dn},{dz},{status})'''.format(
        station=dat[0], dd=dat[1], hh=dat[2], mm=dat[3], ddmmyy=ts, de=dat[4], dn=dat[5], dz=dat[6], status=dat[7].rstrip("\n"))
    cursor.execute(sql)
    print(sql)

def readFile():
    # files = open("output.asc", "r+")
    files = open("output.dat", "r+")
    for f in files:
        f.strip()
        arr = f.split(" ")
        arr = list(filter(None, arr))

        insertDb(arr)

def runExe():
    #subprocess.Popen(["READUBX.exe"],
    #stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True).communicate()
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