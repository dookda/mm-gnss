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

# def timeConvert():


def insertDb(dat):
    ts = f"{dat[1][4:8]}-{dat[1][2:4]}-{dat[1][0:2]}"
    sql = '''INSERT INTO dataset(stat_code, dd, hh, mm, ts, de, dn, dh, status)VALUES(
        '{station}','{dd}','{hh}','{mm}','{ddmmyy} {hh}:{mm}',{de},{dn},{dz},{status})'''.format(
        station=dat[0], dd=dat[1], hh=dat[2], mm=dat[3], ddmmyy=ts, de=dat[4], dn=dat[5], dz=dat[6], status=dat[7].rstrip("\n"))
    # cursor.execute(sql)
    print(sql)


# def resData(r, *args, **kwargs):
#     dat = json.loads(r.text)
#     print(dat["status"])


# def readStatus(dat):
#     station = dat[0]
#     status = dat[7].rstrip("\n")
#     status_text = ""
#     print(f"{station} {status}")

#     if status == "1":
#         print("เปิด เหลือง")
#         status_text = "Movement is low (10-20 cm)"
#         requests.get(
#             f"https://rti2dss.com:3510/api/testapi/{station}/{status_text}", hooks={'response': resData})
#         # f'http://25.81.83.49/{station}/rpidata/setRelay/?cha=3&onoff=1')
#     elif status == "2":
#         print("เปิด แดง")
#         status_text = "Movement is medium (20-30cm)"
#         requests.get(
#             f"https://rti2dss.com:3510/api/testapi/{station}/{status_text}", hooks={'response': resData})
#     elif status == "3":
#         print("เปิด เหลือง")
#         status_text = "Movement is high (more than 30cm)"
#         requests.get(
#             f"https://rti2dss.com:3510/api/testapi/{station}/{status_text}", hooks={'response': resData})
#     elif status == "4":
#         status_text = "System failures"
#         requests.get(
#             f"https://rti2dss.com:3510/api/testapi/{station}/{status_text}", hooks={'response': resData})

    # send to LINE
    # requests.post('https://localhost/multicast', data={'key': status_text})


def readFile():
    # files = open("output.asc", "r+")
    files = open("/Users/sakdahomhuan/Dev/mm-gnss/filter/output.dat", "r+")
    for f in files:
        f.strip()
        arr = f.split(" ")
        arr = list(filter(None, arr))

        insertDb(arr)
        # readStatus(arr)
    # clear content
    # files.truncate(0)
    # files.close()


def runExe():
    # subprocess.Popen(["FILTER2.exe"],
    #                  stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True).communicate()
    # print("readFile")
    readFile()


def runSched():
    runExe()

    print("runSched")
    # conn.commit()
    # conn.close()


if __name__ == "__main__":
    def run():
        schedule.every(5).seconds.do(runSched)
        while True:
            schedule.run_pending()
            time.sleep(1)
