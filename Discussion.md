Solutions Considered

1. Extracting to the Current Directory

At first, we thought about extracting the log files in the same folder as the script. This was easy because no extra setup was needed. But it made the folder messy with too many files, so we looked for a better option.

2. Using a Fixed Folder Path

Next, we tried setting a fixed folder like tech-campus-recruitment-2025/output. This made sure all logs went to the right place. However, if we moved the script to another computer, we would have to change the folder path again.

3. Using a Flexible Path (Two Levels Up to output)

The best idea was to automatically set the folder two levels up from where the script is. This way, no matter where the script is placed, it will always put logs in the output folder.

Why We Chose This Solution

We picked the flexible path method because:

It doesn’t require hardcoding folder locations, making it work anywhere.

It keeps the script’s folder clean.

It ensures logs always go to output, no matter where the script runs.

How to Run the Script

Before You Start

Make sure you have Node.js installed. Run:

node -v

If you see a version number, Node.js is installed.

Install required packages by running:

npm install fs path readline yauzl fs-extra

Running the Script

Open your terminal and go to the script’s folder:

cd /path/to/your/script

Run the script with a date:

node extract_logs.js YYYY-MM-DD

Replace YYYY-MM-DD with the date you want to search for.

What Happens Next

The script will take the .log file from logs_2024.log.zip and put it in opt.

It will create a new file output_YYYY-MM-DD.txt in opt, containing logs from the given date.

Messages will appear in the terminal to show progress.

Extra Notes

If the output folder doesn’t exist, the script will create it.

Make sure the logs_2024.log.zip file is in the same folder as the script before running it.
