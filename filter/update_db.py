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


def alertURL(txt):
    # send alert
    url = 'https://www.w3schools.com/python/demopage.php'
    myobj = {'somekey': txt}
    x = requests.post(url, data=myobj)
    print(x.text)


alertURL("txt")


def checkData(dat):
    a = dat.rstrip("\n")
    print(a)
    if int(a) == 1:
        alertURL("moving at 10-20 cm")
    elif int(a) == 2:
        alertURL("moving >20 cm")
    else:
        print("nomal")


def insertDb(dat):
    checkData(dat[7])

    sql = "INSERT INTO gnsstb(station, dt, de, dn, dz, status)VALUES('{stacode}','{d} {h}:{m}',{de},{dn},{dz},{status})".format(
        stacode=dat[0], d=dat[1], h=dat[2], m=dat[3], de=dat[4], dn=dat[5], dz=dat[6], status=dat[7])
    cursor.execute(sql)
    print(sql)


def readFile():
    files = open("output.asc", "r+")
    for f in files:
        i = f.split(",")
        print(i)
        insertDb(i)
    files.truncate(0)
    files.close()


def runExe():
    # subprocess.Popen(["FILTER.exe"],
    #                  stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True).communicate()
    # print("readFile")
    readFile()


def runSched():
    print("runSched")
    runExe()
    conn.commit()
    # conn.close()

# testgit


if __name__ == "__main__":
    schedule.every(5).seconds.do(runSched)
    while True:
        schedule.run_pending()
        time.sleep(1)
