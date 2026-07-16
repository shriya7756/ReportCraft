import re

from setuptools import setup, find_packages

# Read the content of the README file
with open("README.md", encoding="utf-8") as f:
    long_description = f.read()
    # Remove p tags.
    pattern = re.compile(r"<p.*?>.*?</p>", re.DOTALL)
    long_description = re.sub(pattern, "", long_description)

# Read the content of the requirements.txt file
with open("requirements.txt", encoding="utf-8") as f:
    requirements = f.read().splitlines()


setup(
    name="knowledge-reportcraft",
    version="1.1.1",
    author="ReportCraft Team",
    author_email="team@reportcraft.dev",
    description="ReportCraft: An AI-powered knowledge curation and research report engine.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/reportcraft/reportcraft",
    license="MIT License",
    packages=find_packages(),
    classifiers=[
        "Development Status :: 3 - Alpha",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
    ],
    python_requires=">=3.10",
    install_requires=requirements,
)
