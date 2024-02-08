from flask_login import login_user
from flask import current_app
from edurange_refactored.user.models import User
from edurange_refactored.extensions import db, csrf_protect
from edurange_refactored.flask.modules.utils.account_utils import register_user
from edurange_refactored.flask.modules.utils.auth_utils import login_er3
import secrets
from edurange_refactored.flask.modules.db.schemas.user_schemas import LoginSchema, RegistrationSchema
from flask_jwt_simple import create_jwt

from flask import (
    Blueprint,
    request,
    session,
    jsonify,
    make_response,
    render_template
)
db_ses = db.session
edurange3_csrf = secrets.token_hex(32)


blueprint_edurange3_public = Blueprint(
    'edurange3_public', 
    __name__, 
    url_prefix='/api')

# disable legacy csrf_protect; enforced w/ @jwt_and_csrf_required()
csrf_protect.exempt(blueprint_edurange3_public) 

@blueprint_edurange3_public.errorhandler(418)
def custom_error_handler(error):
    response = jsonify({"error": "request pubroute denied"})
    response.status_code = 418
    response.content_type = "application/json"
    return response

@blueprint_edurange3_public.route("/login", methods=["POST"])
def login_edurange3():
    
    validation_schema = LoginSchema()  # instantiate validation schema
    validated_data = validation_schema.load(request.json) # validate login. reject if bad.
    
    validated_user_obj = User.query.filter_by(username=validated_data["username"]).first()
    if validated_user_obj: login_user(validated_user_obj) # login to legacy app



    if 'X-XSRF-TOKEN' not in session:
        session['X-XSRF-TOKEN'] = secrets.token_hex(32)
    
    validated_user_dump = validation_schema.dump(vars(validated_user_obj))
    del validated_user_dump['password']   # remove pw hash from return obj
    # - The first and only role check. [`role`] property is soon placed in jwt.
    # - Afterward, role value should be accessed from `g.current_user_role` 
    temp_role = "student"
    if validated_user_dump["is_admin"]: temp_role = "admin"
    elif validated_user_dump["is_instructor"]: temp_role = "instructor"

    del validated_user_dump['is_instructor']
    del validated_user_dump['is_admin']
    validated_user_dump['role'] = temp_role
    json_return = { "user_data": validated_user_dump }
    print (json_return, "SALDFKJASLKFJDSLKJ")
    logged_in_return = login_er3(validated_user_dump, '/')
    print(logged_in_return)

#     login_return = make_response(jsonify(validated_user_dump))
    
#     # generates JWT and encodes these values. (NOT hidden from user)
#     # note: 'identity' is a payload keyword for Flask-JWT-Simple. best to leave it
#     token_return = create_jwt(identity=({  
#         "username": validated_user_dump["username"],
#         "user_role": temp_role,
#         "user_id": validated_user_dump["id"]
#         }))
    
#     # httponly=True ; this property mitigates XSS attacks by 'blinding' JS to the value
#     login_return.set_cookie(
#         'edurange3_jwt', 
#         token_return, 
#         samesite='Lax', 
#         httponly=True,
#         path='/'
#     )
#     # mitigate JWT/session related CSRF attacks
#     # no httponly=True ; JS needs access to value
#     login_return.set_cookie(
#         'X-XSRF-TOKEN', 
#         session['X-XSRF-TOKEN'], 
#         samesite='Lax',
#         path='/'
# )
    return logged_in_return

@blueprint_edurange3_public.route("/register", methods=["POST"])
def registration():
    
    validation_schema = RegistrationSchema()  # instantiate validation schema
    validated_data = validation_schema.load(request.json) # validate registration. reject if bad.
    
    existing_db_user = User.query.filter_by(username=validated_data["username"]).first()
    
    if existing_db_user is None:
        print("existing db user was not found, trying to create with: ", validated_data)
        register_user(validated_data) # register user in the database
        return jsonify({"response":"account successfully registered"})
    else: return jsonify({"response":"user already exists. account NOT registered"})


# disabled bc vite handles entry html now
# @blueprint_edurange3_public.route("/", defaults={'path': ''}, methods=["GET"])
# @blueprint_edurange3_public.route("/<path:path>")
# def catch_all(path):
#     return render_template("public/edurange_entry.html")

# @blueprint_edurange3_public.route("/login", methods=["POST", "OPTIONS"])
# def login_blog():
#     print('login route accessed')

#     requestJSON = request.json

#     validation_schema = LoginSchema()  # instantiate validation schema
#     authed_reqUser = validation_schema.load(requestJSON) # validate/auth login. reject if bad.
#     authed_dbUser = User.objects(username=authed_reqUser['username']).first()

#     if 'X-XSRF-TOKEN' not in session:
#         session['X-XSRF-TOKEN'] = secrets.token_hex(32)

#     response_json = login_user(authed_dbUser, '/') # creates auth tokens/cookies and adds them to response (2nd arg is url root path cookie applies to)

#     return response_json