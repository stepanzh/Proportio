from dataclasses import dataclass
import argparse
import jinja2
import json
import pathlib
import sys
import typing


def parse_commandline():
    parser = argparse.ArgumentParser()
    parser.add_argument("-m", "--mode", choices=["debug", "deploy"], required=True)
    parser.add_argument("-f", "--filepath")
    args = parser.parse_args()
    return args


@dataclass
class RecipeExample:
    title: str
    ingredients: typing.List[str]
    relative_url: str

    @property
    def ingredients_as_string(self):
        ingredients = list(map(lambda x: str(x).lower(), self.ingredients))
        ingredients[0] = ingredients[0].capitalize()
        s = ", ".join(ingredients)
        return s

    @classmethod
    def from_json_path(cls, json_path):
        with open(json_path) as io:
            recipe_list = json.loads(io.read())

            ingredients = [item["name"] for item in recipe_list]
            # ingredients = filter(lambda x: x.lower() not in {"порция"}, ingredients)

            # Remove both .proportio and .json
            title = json_path.with_suffix('').stem

            relative_url = '/'.join(json_path.parts[1:])
            return RecipeExample(title=title, ingredients=list(ingredients), relative_url=relative_url)


def main(path, mode):
    if not path:
        ioin = sys.stdin
    else:
        ioin = open(path)

    template_html = ioin.read()
    ioin.close()

    recipe_dir = pathlib.Path("src/example_recipes/")

    recipes = map(
        lambda path: RecipeExample.from_json_path(path),
        filter(lambda x: x.is_file(), recipe_dir.iterdir())
    )

    template = jinja2.Template(template_html)
    rendered = template.render({
        "recipe_examples": recipes,
    })

    print(rendered)


if __name__ == "__main__":
    args = parse_commandline()
    main(path=args.filepath, mode=args.mode)
