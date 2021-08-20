import pandas as pd
import json
import numpy as np
import csv


def process_data(data_filename, qg_output, qa_output, start_line=None, end_line=None):
    visited = {}
    with open(data_filename, 'r', encoding="utf-8") as fileinput:
        with open(qg_output, 'w', newline='', encoding="utf-8") as fileoutput_qg:
            csv_writer_gq = csv.writer(fileoutput_qg, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
            csv_writer_gq.writerow(['', 'question','text'])
            with open(qa_output, 'w', newline='', encoding="utf-8") as fileoutput_qa:
                csv_writer_ga = csv.writer(fileoutput_qa, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
                csv_writer_ga.writerow(['', 'question','answer'])
                counter = 0
                dev_data = json.load(fileinput)
                dev_data = dev_data["paragraphs"]
                for text_data_key in dev_data:
                    text_data = dev_data[text_data_key]
                    for paragraph_data in text_data:
                        context = paragraph_data["context"].strip()
                        for qas in paragraph_data["qas"]:
                            question = qas["question"]
                            if question not in visited:
                                visited[question] = {}
                            for answer_data in qas["answers"]:
                                answer = answer_data["text"].strip()
                                if answer in visited[question]:
                                    continue
                                visited[question][answer] = True
                                text = "<answer> " + answer + " <context> " + context
                                if (start_line == None or (counter >= start_line)) and (end_line == None or (counter < end_line)):
                                    csv_writer_gq.writerow([counter, question, text])
                                    csv_writer_ga.writerow([counter, question, answer])
                                counter += 1


def main():
    train_filename = "data/external/train-v2.0-translated_fixed_enhanced.json"
    dev_filename = "data/external/dev-v2.0-translated_fixed_enhanced.json"
    train_output_qg = "data/processed/qg-train-v2.0-processed.csv"
    dev_output_qg = "data/processed/qg-dev-v2.0-processed.csv"
    train_output_qa = "data/processed/qa-train-v2.0-processed.csv"
    dev_output_qa = "data/processed/qa-dev-v2.0-processed.csv"

    process_data(train_filename, train_output_qg, train_output_qa, 0, 8192)
    process_data(dev_filename, dev_output_qg, dev_output_qa, 2048)


if __name__ == "__main__":
    main()
