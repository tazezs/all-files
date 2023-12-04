from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('search.html')

@app.route('/search', methods=['POST'])
def search():
    url = request.form['urlInput']
    if url:
        return redirect(url_for('generate_report', url=url))
    else:
        return "Please enter a URL!"

@app.route('/generate_report/<path:url>')
def generate_report(url):
    report_content = f"URL: {url}\nArchived URL: https://web.archive.org/web/*/{url}\nURLScan: https://urlscan.io/search/#search={url}\nVirusTotal: https://www.virustotal.com/gui/domain/{url}"
    download_link = f"data:text/plain;charset=utf-8,{report_content}"
    return render_template('report.html', report_content=report_content, download_link=download_link)

if __name__ == '__main__':
    app.run(debug=True)
