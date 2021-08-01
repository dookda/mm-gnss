import datetime
import psycopg2 as pg2
import schedule
import time
import os
import subprocess

dbName = "test"
dbUser = "postgres"
dbPass = "1234"
dbHost = "localhost"
dbPort = "5432"

conn = pg2.connect(database=dbName, user=dbUser,
                   password=dbPass, host=dbHost, port=dbPort)
conn.autocommit = True
cursor = conn.cursor()


def insertDb(dat):
    currentDate = datetime.datetime.now().strftime("%Y-%m-%d")
    sql = "INSERT INTO dataset(stat_code, timestamp)VALUES('{stacode}','{cr} {ts}')".format(
        stacode=dat[0], cr=currentDate, ts=dat[1])
    # cursor.execute(sql)
    print(sql)


def readFile():
    files = open(r"C:\Dev\mm-gnss\www\filter\output.asc", "r+")
    for f in files:
        i = f.split("   ")
        print(i)
        insertDb(i)
    # files.truncate(0)
    files.close()


def runExe():
    # subprocess.call(r"C:\Dev\mm-gnss\www\filter\runfilter.bat")
    subprocess.Popen(["runfilter.bat"],
                     stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True).communicate()
    # subprocess.call(r"C:\Dev\mm-gnss\www\filter\FILTER.exe", shell=True)
    # import os
    # os.system('"C:/Dev/mm-gnss/www/filter/runfilter.bat"')
    print("readFile")
    # readFile()


def runSched():
    print("runSched")
    runExe()
    # conn.commit()
    # conn.close()


if __name__ == "__main__":
    schedule.every(5).seconds.do(runSched)
    while True:
        schedule.run_pending()
        time.sleep(1)
