import sqlite3
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Funksioni për të krijuar databazën (E ndryshova në gym.db)
def init_db():
    conn = sqlite3.connect('gym.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS anetaret (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            emri TEXT NOT NULL,
            telefoni TEXT NOT NULL,
            paketa TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/regjistro', methods=['POST'])
def regjistro():
    # request.form merr të dhënat nga atributi 'name' i input-eve në HTML
    emri = request.form.get('emri')
    telefoni = request.form.get('telefoni')
    paketa = request.form.get('paketa')

    conn = None
    try:
        conn = sqlite3.connect('gym.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO anetaret (emri, telefoni, paketa) VALUES (?, ?, ?)', 
                       (emri, telefoni, paketa))
        conn.commit()
        return jsonify({"status": "success", "message": f"Faleminderit {emri}! Regjistrimi u krye."})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})
    finally:
        if conn:
            conn.close()

@app.route('/admin')
def admin():
    try:
        conn = sqlite3.connect('gym.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM anetaret ORDER BY id DESC')
        te_dhenat = cursor.fetchall()
        conn.close()
        # Sigurohu që ke një skedar admin.html në folderin templates
        return render_template('admin.html', anetaret=te_dhenat)
    except Exception as e:
        return f"Gabim në leximin e të dhënave: {str(e)}"

# KJO DUHET TË JETË GJITHMONË NË FUND TË SKEDARIT
if __name__ == '__main__':
    app.run(debug=True, port=5001)