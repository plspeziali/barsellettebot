import markovify
import json

# Get raw text as string.
with open("fullBarze.txt") as f:
    text = f.read()

# Build the model.
text_model = markovify.Text(text, well_formed = False)
model_json = text_model.to_json()

with open('data.json', 'w') as json_file:
    json.dump(model_json, json_file)