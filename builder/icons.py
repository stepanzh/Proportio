import pathlib
import typing


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
