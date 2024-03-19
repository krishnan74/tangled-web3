# from langchain.chat_models import ChatOpenAI
# from langchain.agents import create_json_agent
# from langchain.agents.agent_toolkits import JsonToolkit
# from langchain.tools.json.tool import JsonSpec
# from flask import Flask, request, jsonify
# from flask_cors import CORS

#

# app = Flask(__name__)
# CORS(app, resources={r"/chatbot": {"origins": "http://localhost:3000"}})

# @app.route('/chatbot', methods=['POST'])
# def process_data():
#     data = request.get_json()
#     spec = JsonSpec(dict_=data, max_value_length=4000)
#     toolkit = JsonToolkit(spec=spec)

#     agent = create_json_agent(llm=ChatOpenAI(openai_api_key=OPENAI_API_KEY, temperature=0, model="gpt-3.5-turbo"), toolkit=toolkit, max_iterations=1000, verbose=True)

#     user_input = data.get('user_input', '')  # Assuming the JSON contains a 'user_input' key

#     response = agent.run(user_input)

#     return jsonify({'response': response})

# if __name__ == '__main__':
#     app.run(debug=True, port=8080)

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd 
from sklearn.ensemble import RandomForestClassifier 
import matplotlib.pyplot as plt
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from sklearn.preprocessing import LabelEncoder 
from reportlab.lib.pagesizes import letter 
from reportlab.platypus import SimpleDocTemplate, Paragraph 
from reportlab.lib.styles import getSampleStyleSheet 
from reportlab.lib import colors 
from langchain_community.utilities import WikipediaAPIWrapper
from reportlab.lib.units import inch
from io import BytesIO
from langchain.chat_models import ChatOpenAI
from langchain.agents import create_json_agent
from langchain.agents.agent_toolkits import JsonToolkit
from langchain.tools.json.tool import JsonSpec
import os


app = Flask(__name__)

@app.route("/chatbot", methods=["POST"])
def chatbot():
    OPENAI_API_KEY = ""
    if request.method == "POST":


        # Get the JSON data sent from the client
        data = request.get_json()

        
        user_input = data.get('userInput', '')
        details = data.get('data', '')

        spec = JsonSpec(dict_=details, max_value_length=4000)
        toolkit = JsonToolkit(spec=spec)

        agent = create_json_agent(llm=ChatOpenAI(openai_api_key=OPENAI_API_KEY, temperature=0, model="gpt-3.5-turbo"), toolkit=toolkit, max_iterations=1000, verbose=True)

        
        response = agent.run(user_input)

        return jsonify(response)
    
    
    else:
        # This is a GET request, return a message indicating it's not supported
        return jsonify({
            "message": "GET request not supported for this route"
        })


if __name__ == "__main__":
    app.run(debug=True, port=8080)
