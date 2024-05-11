## Open chats django backend

### Releasing the python sub-packages

Both the `chat` and `core` app are composable django apps, that are released to pypi.

```bash
sorce venv/bin/activate
pip3 install build twine
# cd chat or core
python3 -m build
python3 -m twine upload dist/*
```
