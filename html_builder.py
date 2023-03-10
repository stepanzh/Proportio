# TODO: pathlib, global config

from dataclasses import dataclass
import argparse
import jinja2
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
    )


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
    })

    print(rendered)


if __name__ == "__main__":
    args = parse_commandline()
    main(path=args.filepath, mode=args.mode)
