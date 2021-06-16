import markovify
import sys
import json

# Get raw text as string.
model_json = json.load(open("data.json",)) 
text_model = markovify.Text.from_json(model_json)

barze = text_model.make_sentence();

if barze:
    print(barze);
else:
    while barze is None:
        barze = text_model.make_sentence();
    print(barze);


sys.stdout.flush()