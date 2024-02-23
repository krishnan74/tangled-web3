from langchain.chat_models import ChatOpenAI
from langchain.agents import create_json_agent
from langchain.agents.agent_toolkits import JsonToolkit
from langchain.tools.json.tool import JsonSpec
from flask import Flask, request, jsonify

OPENAI_API_KEY = "api_key"

app = Flask(__name__)

@app.route('/patient/<string:patient_id>', methods=['POST'])
def process_data(patient_id):
    data = request.get_json()
    spec = JsonSpec(dict_=data, max_value_length=4000)
    toolkit = JsonToolkit(spec=spec)

    agent = create_json_agent(llm=ChatOpenAI(openai_api_key=OPENAI_API_KEY, temperature=0, model="gpt-3.5-turbo"), toolkit=toolkit, max_iterations=1000, verbose=True)

    user_input = data.get('user_input', '')  # Assuming the JSON contains a 'user_input' key

    response = agent.run(user_input)

    return jsonify({'patient_id': patient_id, 'response': response})

if __name__ == '__main__':
    app.run(debug=True)
