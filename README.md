# Installation

A simple web IDE is available which allows you to run Whiley on your computer using a web browser.  The following screenshot illustrates:

<img src="http://whiley.org/wp-content/uploads/2017/06/wyweb2.png"/>

To setup the Web IDE, simple clone the WhileyWeb repository from github:
```
% git clone https://github.com/Whiley/WhileyWeb.git
Cloning into 'WhileyWeb'...
remote: Counting objects: 220, done.
remote: Compressing objects: 100% (5/5), done.
remote: Total 220 (delta 0), reused 4 (delta 0), pack-reused 213
Receiving objects: 100% (220/220), 5.98 MiB | 163.00 KiB/s, done.
Resolving deltas: 100% (76/76), done.
Checking connectivity... done.
```
At this point, you can run the web IDE from the command line using `ant` (if you have that installed) as follows:
```
% ant run
```
Then, just point your web browser to `localhost:8080` to access the IDE. Alternatively, you can create a project in Eclipse and run the Web IDE from there.
