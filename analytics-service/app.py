import os
from flask import Flask, jsonify
import psycopg2

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(
        host=os.environ.get('DB_HOST', 'db'),
        database=os.environ.get('DB_NAME', 'tododb'),
        user=os.environ.get('DB_USER', 'todouser'),
        password=os.environ.get('DB_PASSWORD', 'todopassword'),
        port=os.environ.get('DB_PORT', '5432')
    )
    return conn

@app.route('/stats', methods=['GET'])
def get_stats():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT COUNT(*) FROM tasks;')
        total = cur.fetchone()[0]
        
        cur.execute("SELECT COUNT(*) FROM tasks WHERE status = 'COMPLETED';")
        completed = cur.fetchone()[0]
        
        cur.close()
        conn.close()
        
        return jsonify({
            'total_tasks': total,
            'completed_tasks': completed,
            'pending_tasks': total - completed
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)