# -*- coding: utf-8 -*-
"""Setup tests for this package."""
from eganovo_pokrova.theme5.testing import EGANOVO_POKROVA_THEME5_INTEGRATION_TESTING  # noqa
from plone import api

import unittest


class TestSetup(unittest.TestCase):
    """Test that eganovo_pokrova.theme5 is properly installed."""

    layer = EGANOVO_POKROVA_THEME5_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer['portal']
        self.installer = api.portal.get_tool('portal_quickinstaller')

    def test_product_installed(self):
        """Test if eganovo_pokrova.theme5 is installed."""
        self.assertTrue(self.installer.isProductInstalled(
            'eganovo_pokrova.theme5'))

    def test_browserlayer(self):
        """Test that IEganovoPokrovaTheme5Layer is registered."""
        from eganovo_pokrova.theme5.interfaces import (
            IEganovoPokrovaTheme5Layer)
        from plone.browserlayer import utils
        self.assertIn(IEganovoPokrovaTheme5Layer, utils.registered_layers())


class TestUninstall(unittest.TestCase):

    layer = EGANOVO_POKROVA_THEME5_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer['portal']
        self.installer = api.portal.get_tool('portal_quickinstaller')
        self.installer.uninstallProducts(['eganovo_pokrova.theme5'])

    def test_product_uninstalled(self):
        """Test if eganovo_pokrova.theme5 is cleanly uninstalled."""
        self.assertFalse(self.installer.isProductInstalled(
            'eganovo_pokrova.theme5'))

    def test_browserlayer_removed(self):
        """Test that IEganovoPokrovaTheme5Layer is removed."""
        from eganovo_pokrova.theme5.interfaces import IEganovoPokrovaTheme5Layer
        from plone.browserlayer import utils
        self.assertNotIn(IEganovoPokrovaTheme5Layer, utils.registered_layers())
