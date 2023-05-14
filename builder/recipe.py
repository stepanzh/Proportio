from dataclasses import dataclass
import json
import pathlib
import typing


@dataclass
class RecipeCredits:
    author: str = ''
    recipe_url: str = ''

    @classmethod
    def from_dict(cls, d):
        if d is None:
            return RecipeCredits()

        author = d.get('author', '')
        recipe_url = d.get('recipe_url', '')
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
        s = ', '.join(ingredients)
        return s

    @classmethod
    def from_json_path(cls, json_path):
        with open(json_path) as io:
            recipe = json.loads(io.read())

            title = recipe.get('title', '').replace(' - ', ' &#8212; ')
            ingredients = [item['name'] for item in recipe.get('original_items')]
            # TODO: Should be refactored
            relative_url = json_path.relative_to(
                pathlib.Path(__file__).parent.parent / 'static'
            )
            credits = RecipeCredits.from_dict(recipe.get('credits'))

            return RecipeExample(title=title, ingredients=list(ingredients), relative_url=relative_url, credits=credits)
