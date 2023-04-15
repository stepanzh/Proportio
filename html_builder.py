# TODO: pathlib, global config

from dataclasses import dataclass
import argparse
import jinja2
import pathlib
import sys


def parse_commandline():
    parser = argparse.ArgumentParser()
    parser.add_argument("-m", "--mode", choices=["debug", "deploy"], required=True)
    parser.add_argument("-f", "--filepath")
    args = parser.parse_args()
    return args


@dataclass
class JqueryCDN:
    src:str = ""
    integrity:str = ""

    @classmethod
    def debug(cls):
        return JqueryCDN(
            src="https://code.jquery.com/jquery-3.6.2.js",
            integrity="sha256-pkn2CUZmheSeyssYw3vMp1+xyub4m+e+QK4sQskvuo4="
        )

    @classmethod
    def deploy(cls):
        return JqueryCDN(
            src="https://code.jquery.com/jquery-3.6.3.slim.min.js",
            integrity="sha256-ZwqZIVdD3iXNyGHbSYdsmWP//UBokj2FHAxKuSBKDSo="
        )


@dataclass
class ExternalLinks:
    payment:str = "https://www.tinkoff.ru/cf/7T9naweBKz8"
    repository:str = "https://github.com/stepanzh/Proportio"


@dataclass
class Contact:
    firstname:str = ""
    secondname:str = ""
    telegram:str = ""
    github:str = ""

@dataclass
class ProjectContacs:
    Stepan:Contact = Contact(
        firstname="Степан",
        secondname="Захаров",
        telegram="https://t.me/red_deer",
        github="https://github.com/stepanzh",
    )
    Alexandra:Contact = Contact(
        firstname="Александра",
        secondname="Кобец",
        telegram="https://t.me/kobets_dez",
    )
    Mariya:Contact = Contact(
        firstname="Мария",
        secondname="Лукьянова",
        telegram="https://t.me/Marnia_made"
    )


class Icons:
    def __init__(self):
        self.inner = dict()

    def __getattr__(self, icon_name):
        if icon_name not in self.inner.keys():
            raise AttributeError()
        return self.inner[icon_name]

    @classmethod
    def from_icon_folder(cls, folder_path: pathlib.Path):
        assert folder_path.is_dir(), f"Icon folder does not exist: {folder_path}"

        icons = Icons()

        for child in folder_path.iterdir():
            if not child.is_file():
                continue
            with open(child) as io:
                icons.inner[child.stem] = io.read().strip()
        return icons


def main(path, mode):
    if not path:
        ioin = sys.stdin
    else:
        ioin = open(path)

    template_html = ioin.read()
    ioin.close()

    jquery = JqueryCDN.debug() if mode == "debug" else JqueryCDN.deploy()

    template = jinja2.Template(template_html)
    rendered = template.render({
        "jquery": jquery,
        "links": ExternalLinks(),
        "contacts": ProjectContacs(),
        "icons": Icons.from_icon_folder(pathlib.Path(path).parent / "icons"),
    })

    print(rendered)


if __name__ == "__main__":
    args = parse_commandline()
    main(path=args.filepath, mode=args.mode)
