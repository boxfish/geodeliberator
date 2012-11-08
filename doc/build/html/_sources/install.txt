Installation
============

1. Install virtualenvwrapper
	Follow instruction: http://virtualenvwrapper.readthedocs.org/en/latest/

2. Create a new virtualenv
	``mkvirtualenv geodeliberator``

3. Install dependencies
	``pip install -r requirements.txt``
	
	Detail description of dependencies:
		* Django: the web framework in Python
		* South: a Django middleware for easy database migration
		* psycopg2: PostgreSQL database driver in Python
		* BeautifulSoup: a library for hmtl/xml processing
		* python-dateutil: extensions to the standard datetime module
		* numpy: dependency for gdal

4. Install Geospatial libraries
	``brew install gdal``

	https://docs.djangoproject.com/en/dev/ref/contrib/gis/install/geolibs/

5. Setup up postgresql database in settings.py
	* 'HOST': '130.203.151.146',
	* 'PORT': '5432', 
	* 'USER': 'postgres',
	* 'PASSWORD': '309ist',
	* 'NAME': 'geodeliberator'

6. Run the development server
	``python manage.py runserver``

