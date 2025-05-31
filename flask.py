from flask import Flask, request, jsonify
import datetime

app = Flask(__name__)

history = []

@app.route('/feed', methods=['GET', 'POST'])
def feed():
    data = request.json
    feed_method = data['feed_method']
    feed_num = data['feed_num']
    if feed_method == 0:
        time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        history.append({"time": time, "amount": feed_num})
        # 添加控制投喂硬件的代码
        return jsonify({"status": "success"})
    elif feed_method == 1:
        feed_time = data['feed_time']
        history.append({"time": feed_time, "amount": feed_num})
        # 添加定时投喂逻辑（如使用 APScheduler）
        return jsonify({"status": "success"})
    else:
        return jsonify({"status": "error", "message": "Invalid feed_method"}), 400

@app.route('/history', methods=['GET'])
def get_history():
    return jsonify(history)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)