import sqlite3
from flask import Flask, render_template, request, jsonify
import smtplib
import os
from email.message import EmailMessage
from dotenv import load_dotenv

# Ngarkon variablat nga skedari .env
load_dotenv()

app = Flask(__name__)

# --- FUNKSIONI PËR DËRGIMIN E EMAIL-IT ---
# --- FUNKSIONI I PËRDITËSUAR PËR DËRGIMIN E EMAIL-IT ---
def dergo_email_njoftimi(emri, telefoni, paketa):
    msg = EmailMessage()
    
    html_content = f"""
    <html>
        <body style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px;">
            <h2 style="color: #d32f2f;">Fusion Gym - Regjistrim i Ri!</h2>
            <p>Ju keni një aplikim të ri nga faqja juaj e internetit:</p>
            <hr>
            <p><strong>Emri:</strong> {emri}</p>
            <p><strong>Telefoni:</strong> {telefoni}</p>
            <p><strong>Paketa e zgjedhur:</strong> {paketa}</p>
            <hr>
            <p style="font-size: 12px; color: #777;">Ky është një njoftim automatik nga sistemi juaj.</p>
        </body>
    </html>
    """
    msg.set_content(f"Regjistrim i ri: {emri}, Tel: {telefoni}, Paketa: {paketa}")
    msg.add_alternative(html_content, subtype='html')
    
    msg['Subject'] = f'🔔 Klient i ri: {emri}'
    msg['From'] = os.getenv('EMAIL_USER')
    msg['To'] = 'rumejsaduka0@gmail.com'

    try:
        # Ndryshimi kryesor: Përdorim portën 587 dhe timeout
        with smtplib.SMTP('smtp.gmail.com', 587, timeout=15) as smtp:
            smtp.starttls()  # Siguron lidhjen
            smtp.login(os.getenv('EMAIL_USER'), os.getenv('EMAIL_PASS'))
            smtp.send_message(msg)
        print("✅ Email-i u dërgua me sukses!")
    except Exception as e:
        # Kjo parandalon që gabimi i email-it të bllokojë regjistrimin në website
        print(f"❌ Gabim teknik me email-in: {e}")

# --- DATABASE ---
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
        
        # Thirrja e funksionit të email-it pasi ruhet në DB
        dergo_email_njoftimi(emri, telefoni, paketa)

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

# porti
if __name__ == '__main__':
    # Shënim: Në Render, kjo pjesë mund të injorohet sepse përdoret gunicorn
    app.run(debug=True, port=5001)