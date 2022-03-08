from appJar import gui

 # create the GUI & set a title
#app = gui("Korean Language Program")

def start():
    pass

def stop():
    app.stop()

""" # add labels & entries
app.addLabel("Program")
app.addLabel("Some text here describing the program")
app.addButtons(["Start", "Quit"], [start, stop])
 """
def press(btn):
    if btn == "FIRST": app.firstFrame("Pages")
    elif btn == "NEXT": app.nextFrame("Pages")
    elif btn == "PREV": app.prevFrame("Pages")
    elif btn == "LAST": app.lastFrame("Pages")

with gui("FRAME STACK") as app:
    with app.frameStack("Pages", start=0):
        with app.frame():
            for i in range(5):
                app.label("Text: " + str(i))
        with app.frame():
            for i in range(5):
                app.entry("e" + str(i))
        with app.frame():
            for i in range(5):
                app.button(str(i), None)

    app.buttons(["FIRST", "PREV", "NEXT", "LAST"], press)


# start the GUI
app.go()