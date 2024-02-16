import argparse
from dataclasses import dataclass, field
import configparser
import jinja2
import json
import pathlib
from typing import Optional

from builder.icons import Icons
from builder.contact import Contact
from builder.recipe import RecipeExample


@dataclass
class JqueryCDN:
    src: str
    integrity: str


TEMPLATES_PATH = pathlib.Path(__file__).parent / 'templates'
STATICS_PATH = pathlib.Path(__file__).parent / 'static'
ICONS = Icons.from_icon_folder(STATICS_PATH / 'icons')
EXTERNAL_LINKS = {
    'payment': 'https://pay.cloudtips.ru/p/01aa1961',
    'repository': 'https://github.com/stepanzh/Proportio',
    'vk_community': 'https://vk.com/proportioapp',
}

PROJECT_CONTACTS = {
    'Stepan': Contact(
        firstname='Степан',
        secondname='Захаров',
        telegram='https://t.me/red_deer',
        github='https://github.com/stepanzh',
    ),
}

JQUERY = {
    'debug': JqueryCDN(
        src="https://code.jquery.com/jquery-3.6.2.js",
        integrity="sha256-pkn2CUZmheSeyssYw3vMp1+xyub4m+e+QK4sQskvuo4="
    ),
    'deploy': JqueryCDN(
        src="https://code.jquery.com/jquery-3.6.3.slim.min.js",
        integrity="sha256-ZwqZIVdD3iXNyGHbSYdsmWP//UBokj2FHAxKuSBKDSo="
    ),
}


class Page:
    name: str
    template_variables = {
        'contacts': PROJECT_CONTACTS,
        'icons': ICONS,
        'links': EXTERNAL_LINKS,
        'jquery': JQUERY,
    }

    def extend_template_variables(self, variables: dict):
        self.template_variables |= variables


class PageWriter:
    def __init__(self, environment: jinja2.Environment, rootdir: pathlib.Path):
        self.environment = environment
        self.rootdir = rootdir

    def write(self, page: Page):
        filename = page.name + '.html'
        template = self.environment.get_template(filename)
        text = template.render(page.template_variables)
        with open(self.rootdir / filename, 'w') as io:
            print(text, file=io)


class IndexPage(Page):
    name = 'index'


class PromoPage(Page):
    name = 'promo'
    _config_path = 'config.cfg'

    def __init__(self):
        super().__init__()

        conf_path = pathlib.Path(self._config_path)
        if not conf_path.is_file():
            print('Config not found in:', self._config_path) 
            exit(1)
        
        promo_dict = self._read_promodes_from_config(conf_path)
        self.extend_template_variables(promo_dict)

    def _read_promodes_from_config(self, path):
        promo_dict = dict()

        cfg = configparser.ConfigParser()
        cfg.read(path)

        promo_dict['discount_code'] = cfg.get('promocode.discount', 'code').upper()
        promo_dict['gift_code'] = cfg.get('promocode.gift', 'code').upper()
        promo_dict['gift_name'] = cfg.get('promocode.gift', 'name')
        promo_dict['gift_duration'] = cfg.get('promocode.gift', 'duration')

        # TODO: Log this instead of printing to stdout.
        print('Прочитанная информация для страницы с промокодами')
        print(promo_dict)

        return promo_dict


class ExamplePage(Page):
    name = 'examples'

    def __init__(self):
        recipe_dir = STATICS_PATH / 'example_recipes'

        recipes = sorted(
            map(
                lambda path: RecipeExample.from_json_path(path),
                filter(lambda x: x.is_file(), recipe_dir.iterdir())
            ),
            key=lambda recipe: recipe.title.lower(),
        )

        self.extend_template_variables({
            'recipe_examples': recipes,
        })


PAGES = [IndexPage(), PromoPage(), ExamplePage()]


def parse_commandline():
    parser = argparse.ArgumentParser()
    parser.add_argument('-d', '--output_dir',
        required=True,
        help='output directory for site',
    )
    parser.add_argument('--debug',
        help='generate debuggable version of site',
        action=argparse.BooleanOptionalAction,
        default=False,
    )
    args = parser.parse_args()
    return args

def main():
    args = parse_commandline()

    environment = jinja2.Environment(loader=jinja2.FileSystemLoader(TEMPLATES_PATH))

    pagewriter = PageWriter(environment, pathlib.Path(args.output_dir))
    for page in PAGES:
        page.extend_template_variables({
            'isdebug': args.debug,
        })
        pagewriter.write(page)


if __name__ == '__main__':
    main()
