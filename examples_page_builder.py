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
class RecipeCredits:
    author: str = ""
    recipe_url: str = ""

    @classmethod
    def from_dict(cls, d):
        if d is None:
            return RecipeCredits()

        author = d.get("author", "")
        recipe_url = d.get("recipe_url", "")
        return RecipeCredits(author, recipe_url)

    @property
    def is_empty(self):
        return (not self.author) and (not self.recipe_url)


@dataclass
class RecipeExample:
    title: str
    ingredients: typing.List[str]
    relative_url: str
    credits: RecipeCredits

    @property
    def ingredients_as_string(self):
        ingredients = list(map(lambda x: str(x).lower(), self.ingredients))
        ingredients[0] = ingredients[0].capitalize()
        s = ", ".join(ingredients)
        return s

    @classmethod
    def from_json_path(cls, json_path):
        with open(json_path) as io:
            recipe = json.loads(io.read())

            title = recipe.get("title", "").replace(" - ", " &#8212; ")
            ingredients = [item["name"] for item in recipe.get("original_items")]
            relative_url = '/'.join(json_path.parts[1:])
            credits = RecipeCredits.from_dict(recipe.get("credits"))

            return RecipeExample(title=title, ingredients=list(ingredients), relative_url=relative_url, credits=credits)


def main(path, mode):
    if not path:
        ioin = sys.stdin
    else:
        ioin = open(path)

    template_html = ioin.read()
    ioin.close()

    recipe_dir = pathlib.Path("src/example_recipes/")

    recipes = sorted(
        map(
            lambda path: RecipeExample.from_json_path(path),
            filter(lambda x: x.is_file(), recipe_dir.iterdir())
        ),
        key=lambda recipe: recipe.title.lower(),
    )

    template = jinja2.Template(template_html)
    rendered = template.render({
        "recipe_examples": recipes,
    })

    print(rendered)


if __name__ == "__main__":
    args = parse_commandline()
    main(path=args.filepath, mode=args.mode)
