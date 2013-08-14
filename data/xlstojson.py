import csv
import json

def create_buzzword_fixture(pk, genreid, word, definition, clue):
    if clue is None:
        clue = definition
    return {
        "model": "buzzword.Buzzword",
        "pk": pk,
        "fields":{
            "genre":genreid + 1,
            "word": word,
            "definition": definition,
            "clue": clue
        }
    }


def create_genre_fixture(pk, name):
    return {
        "model": "buzzword.Genre",
        "pk": pk,
        "fields": {
            "name": name,
            "slug": name.replace(' ', '-').lower()
        }
    }

if __name__ == '__main__':
    pk = 1
    buzzword_fixtures = []
    genre_fixtures = []
    column = {
        'assignee': 0,
        'word': 1,
        'definition': 2,
        'clue': 3
    }
    genres = [['hr', 'HR'], ['salesandmarketing', 'Sales and Marketing'], ['cx', 'CX'], ['innovation', 'Innovation'], ['general', 'General'], ['technology', 'Technology'], ['financial', 'Financial']]
    for genreid, genre in enumerate(genres):
        genre_fixtures.append(create_genre_fixture(pk=genreid+1, name=genre[1]))
        with open("buzzwords/%s.csv" % genre[0], 'rb') as csvfile:
            reader = csv.reader(csvfile, delimiter=',')
            for i, row in enumerate(reader):
                buzzword = row[column.get('word')]
                if buzzword is not None:
                    buzzword_fixtures.append(create_buzzword_fixture(
                        pk=pk,
                        genreid=genreid,
                        word=row[column.get('word')],
                        definition=row[column.get('definition')],
                        clue= row[column.get('clue')]
                    ))
                    pk = pk + 1
                with open('buzzwords.json', 'w+') as out:
                    out.write(json.dumps(buzzword_fixtures))

                with open('genres.json', 'w+') as out:
                    out.write(json.dumps(genre_fixtures))
