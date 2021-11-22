import tkinter as tk
from tkinter import ttk

# root window
root = tk.Tk()
root.geometry('300x200')
root.resizable(False, False)
root.title('GNSS control')


def download_clicked():
    # showinfo(
    #     title='Information',
    #     message='Download button clicked!'
    # )
    print("test")


# exit button
start_btn = ttk.Button(
    root,
    text='Exit',
    command=download_clicked,
)

start_btn.pack(
    ipadx=5,
    ipady=5,
    expand=True
)

stop_btn = ttk.Button(
    root,
    text='Exit',
    command=download_clicked,
)

stop_btn.pack(
    ipadx=5,
    ipady=5,
    expand=True
)


root.mainloop()
