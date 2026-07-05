"""
SHAP Explainability Module for ReportCraft
Provides interpretability for AI-generated research reports.
"""
import shap
import numpy as np


def explain_report_scores(model, X, feature_names=None):
    """
    Generate SHAP values to explain model predictions.

    Args:
        model: A trained model with predict method
        X: Input features (numpy array or DataFrame)
        feature_names: Optional list of feature names

    Returns:
        shap_values: SHAP values for each prediction
        explainer: The SHAP explainer object
    """
    explainer = shap.Explainer(model, X)
    shap_values = explainer(X)
    return shap_values, explainer


def plot_summary(shap_values, feature_names=None, max_display=10):
    """Plot a SHAP summary bar chart."""
    shap.plots.bar(shap_values, max_display=max_display, show=False)


def get_top_features(shap_values, feature_names, top_n=5):
    """Return the top N most influential features by mean absolute SHAP value."""
    mean_abs = np.abs(shap_values.values).mean(axis=0)
    indices = np.argsort(mean_abs)[::-1][:top_n]
    return [(feature_names[i], float(mean_abs[i])) for i in indices]
