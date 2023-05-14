from dataclasses import dataclass
import typing


@dataclass
class Contact:
    firstname: str = ""
    secondname: str = ""
    telegram: str = ""
    github: str = ""
