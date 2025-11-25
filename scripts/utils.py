import os
import json
import logging
from typing import Dict, Any, Optional

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def read_json_file(file_path: str) -> Optional[Dict[str, Any]]:
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        logger.error(f"File not found: {file_path}")
    except json.JSONDecodeError:
        logger.error(f"Invalid JSON in file: {file_path}")
    return None

def write_json_file(file_path: str, data: Dict[str, Any]) -> bool:
    try:
        with open(file_path, 'w') as file:
            json.dump(data, file, indent=4)
        return True
    except IOError:
        logger.error(f"Unable to write to file: {file_path}")
    return False

def ensure_directory_exists(directory: str) -> bool:
    if not os.path.exists(directory):
        try:
            os.makedirs(directory)
            return True
        except OSError:
            logger.error(f"Unable to create directory: {directory}")
            return False
    return True

def merge_dicts(dict1: Dict[str, Any], dict2: Dict[str, Any]) -> Dict[str, Any]:
    result = dict1.copy()
    result.update(dict2)
    return result