import pytest
from unittest.mock import MagicMock
import dspy

from knowledge_reportcraft import (
    ReportCraftWikiRunnerArguments,
    ReportCraftWikiRunner,
    ReportCraftWikiLMConfigs,
)

class MockLM(dspy.LM):
    def __init__(self, **kwargs):
        super().__init__("mock_model")
        self.kwargs = kwargs
        self.history = []

    def basic_request(self, prompt, **kwargs):
        pass

    def __call__(self, prompt, only_completed=True, return_sorted=False, **kwargs):
        self.history.append(prompt)
        return ["Mocked response about Quantum Computing"]

class MockRM(dspy.Retrieve):
    def __init__(self, k=3):
        super().__init__(k=k)
        
    def forward(self, query_or_queries, exclude_urls=[]):
        return [{"title": "Quantum Computing", "snippets": ["Quantum computers use qubits."], "url": "http://example.com"}]

def test_runner_initialization():
    lm_configs = ReportCraftWikiLMConfigs()
    lm_configs.set_article_gen_lm(MockLM())
    
    engine_args = ReportCraftWikiRunnerArguments(output_dir="./mock_output")
    rm = MockRM()
    
    runner = ReportCraftWikiRunner(engine_args, lm_configs, rm)
    
    assert runner is not None
    assert runner.engine_args.output_dir == "./mock_output"
