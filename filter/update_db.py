import datetime
import psycopg2 as pg2
import schedule
import time
import os
import subprocess
import requests

dbName = "gnss"
dbUser = "postgres"
dbPass = "1234"
dbHost = "localhost"
dbPort = "5432"

conn = pg2.connect(database=dbName, user=dbUser,
                   password=dbPass, host=dbHost, port=dbPort)
conn.autocommit = True
cursor = conn.cursor()


def insertDb(dat):

    sql = "INSERT INTO dataset(stat_code, ts, y_coor, x_coor, elev, status)VALUES('{stacode}','{d} {h}:{m}',{de},{dn},{dz},{status})".format(
        stacode=dat[0], d=dat[1], h=dat[2], m=dat[3], de=dat[4], dn=dat[5], dz=dat[6], status=dat[7])
    cursor.execute(sql)
    print(sql)


def readFile():
    # files = open("output.asc", "r+")
    files = open(
        "new_output.txt", "r+")
    for f in files:
        i = f.split(",")
        print(i)
        insertDb(i)
        readStatus(i)
    files.truncate(0)
    files.close()


def readStatus(dat):
    if dat[7] == 2:
        print("alert")
        # send to LINE
        requests.post('https://localhost/multicast', data={'key': 'value'})


def runExe():
    subprocess.Popen(["FILTER2.exe"],
                     stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True).communicate()
    print("readFile")
    readFile()


def runSched():
    runExe()

    print("runSched")
    # conn.commit()
    # conn.close()

# testgit


if __name__ == "__main__":
    schedule.every(5).seconds.do(runSched)
    while True:
        schedule.run_pending()
        time.sleep(1)
