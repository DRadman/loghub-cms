'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(fn) { try { return Function.toString.call(fn).indexOf("[native code]") !== -1; } catch (e) { return typeof fn === "function"; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  _inherits(_class, _HTMLElement);
  function _class() {
    var _this;
    _classCallCheck(this, _class);
    _this = _callSuper(this, _class);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }
  _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">loghub-cms documentation</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"overview.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>README\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"license.html\"  data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>LICENSE\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"properties.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-apps\"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links"' : 'data-bs-target="#xs-components-links"', ">\n                            <span class=\"icon ion-md-cog\"></span>\n                            <span>Components</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="components-links"' : 'id="xs-components-links"', ">\n                            <li class=\"link\">\n                                <a href=\"components/AccessDeniedComponent.html\" data-type=\"entity-link\" >AccessDeniedComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/AlertsComponent.html\" data-type=\"entity-link\" >AlertsComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/AppComponent.html\" data-type=\"entity-link\" >AppComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/AuthComponent.html\" data-type=\"entity-link\" >AuthComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/CloseComponent.html\" data-type=\"entity-link\" >CloseComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ConfigComponent.html\" data-type=\"entity-link\" >ConfigComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/CreateOrganizationComponent.html\" data-type=\"entity-link\" >CreateOrganizationComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/DetailsComponent.html\" data-type=\"entity-link\" >DetailsComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/DevicesComponent.html\" data-type=\"entity-link\" >DevicesComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/DocumentationComponent.html\" data-type=\"entity-link\" >DocumentationComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/FooterComponent.html\" data-type=\"entity-link\" >FooterComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ForgotPasswordComponent.html\" data-type=\"entity-link\" >ForgotPasswordComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/GuidesComponent.html\" data-type=\"entity-link\" >GuidesComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/HomeComponent.html\" data-type=\"entity-link\" >HomeComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/InvitationComponent.html\" data-type=\"entity-link\" >InvitationComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/IssuesComponent.html\" data-type=\"entity-link\" >IssuesComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/LoginComponent.html\" data-type=\"entity-link\" >LoginComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/LogsComponent.html\" data-type=\"entity-link\" >LogsComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/MembersComponent.html\" data-type=\"entity-link\" >MembersComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/MembersTableComponent.html\" data-type=\"entity-link\" >MembersTableComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/MenuitemComponent.html\" data-type=\"entity-link\" >MenuitemComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/MessagesComponent.html\" data-type=\"entity-link\" >MessagesComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/NotFoundComponent.html\" data-type=\"entity-link\" >NotFoundComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/NotificationsComponent.html\" data-type=\"entity-link\" >NotificationsComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/OrganizationComponent.html\" data-type=\"entity-link\" >OrganizationComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ProjectDetailsComponent.html\" data-type=\"entity-link\" >ProjectDetailsComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ProjectsComponent.html\" data-type=\"entity-link\" >ProjectsComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ProjectsComponent-1.html\" data-type=\"entity-link\" >ProjectsComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ProjectsTableComponent.html\" data-type=\"entity-link\" >ProjectsTableComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/QueriesComponent.html\" data-type=\"entity-link\" >QueriesComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/RegisterComponent.html\" data-type=\"entity-link\" >RegisterComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ReleasesComponent.html\" data-type=\"entity-link\" >ReleasesComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ReplaysComponent.html\" data-type=\"entity-link\" >ReplaysComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ResetPasswordComponent.html\" data-type=\"entity-link\" >ResetPasswordComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ResourcesComponent.html\" data-type=\"entity-link\" >ResourcesComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/ScreenLoadsComponent.html\" data-type=\"entity-link\" >ScreenLoadsComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/SdksComponent.html\" data-type=\"entity-link\" >SdksComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/SecurityComponent.html\" data-type=\"entity-link\" >SecurityComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/SessionsComponent.html\" data-type=\"entity-link\" >SessionsComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/SettingsComponent.html\" data-type=\"entity-link\" >SettingsComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/SidebarComponent.html\" data-type=\"entity-link\" >SidebarComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/StatsComponent.html\" data-type=\"entity-link\" >StatsComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/SupportComponent.html\" data-type=\"entity-link\" >SupportComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/TeamsComponent.html\" data-type=\"entity-link\" >TeamsComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/TeamsTableComponent.html\" data-type=\"entity-link\" >TeamsTableComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/TopbarComponent.html\" data-type=\"entity-link\" >TopbarComponent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"components/VitalsComponent.html\" data-type=\"entity-link\" >VitalsComponent</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links"' : 'data-bs-target="#xs-injectables-links"', ">\n                                <span class=\"icon ion-md-arrow-round-down\"></span>\n                                <span>Injectables</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"injectables/AuthEffects.html\" data-type=\"entity-link\" >AuthEffects</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/AuthService.html\" data-type=\"entity-link\" >AuthService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/InvitationService.html\" data-type=\"entity-link\" >InvitationService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/JwtService.html\" data-type=\"entity-link\" >JwtService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/LayoutService.html\" data-type=\"entity-link\" >LayoutService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/LocalStorage.html\" data-type=\"entity-link\" >LocalStorage</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/MembersEffects.html\" data-type=\"entity-link\" >MembersEffects</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/MembersService.html\" data-type=\"entity-link\" >MembersService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/MemoryStorage.html\" data-type=\"entity-link\" >MemoryStorage</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/MenuService.html\" data-type=\"entity-link\" >MenuService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/OrganizationEffects.html\" data-type=\"entity-link\" >OrganizationEffects</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/OrganizationService.html\" data-type=\"entity-link\" >OrganizationService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/PlatformEffects.html\" data-type=\"entity-link\" >PlatformEffects</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/PlatformService.html\" data-type=\"entity-link\" >PlatformService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ProjectEffects.html\" data-type=\"entity-link\" >ProjectEffects</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ProjectService.html\" data-type=\"entity-link\" >ProjectService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/RoleEffects.html\" data-type=\"entity-link\" >RoleEffects</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/RoleService.html\" data-type=\"entity-link\" >RoleService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/SessionStorage.html\" data-type=\"entity-link\" >SessionStorage</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/TeamEffects.html\" data-type=\"entity-link\" >TeamEffects</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/TeamService.html\" data-type=\"entity-link\" >TeamService</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#interfaces-links"' : 'data-bs-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/AppConfig.html\" data-type=\"entity-link\" >AppConfig</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/AppState.html\" data-type=\"entity-link\" >AppState</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/AuthenticateRequestDto.html\" data-type=\"entity-link\" >AuthenticateRequestDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/AuthState.html\" data-type=\"entity-link\" >AuthState</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/CreateOrganizationRequestDto.html\" data-type=\"entity-link\" >CreateOrganizationRequestDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/CreateProjectRequestDto.html\" data-type=\"entity-link\" >CreateProjectRequestDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/CreateTeamRequestDto.html\" data-type=\"entity-link\" >CreateTeamRequestDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ForgotPasswordRequestDto.html\" data-type=\"entity-link\" >ForgotPasswordRequestDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Invitation.html\" data-type=\"entity-link\" >Invitation</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/InvitationDto.html\" data-type=\"entity-link\" >InvitationDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/InvitationRequestDto.html\" data-type=\"entity-link\" >InvitationRequestDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/LayoutState.html\" data-type=\"entity-link\" >LayoutState</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/MembersDto.html\" data-type=\"entity-link\" >MembersDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/MembersState.html\" data-type=\"entity-link\" >MembersState</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/MenuChangeEvent.html\" data-type=\"entity-link\" >MenuChangeEvent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Organization.html\" data-type=\"entity-link\" >Organization</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/OrganizationDto.html\" data-type=\"entity-link\" >OrganizationDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/OrganizationState.html\" data-type=\"entity-link\" >OrganizationState</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Platform.html\" data-type=\"entity-link\" >Platform</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/PlatformDto.html\" data-type=\"entity-link\" >PlatformDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/PlatformState.html\" data-type=\"entity-link\" >PlatformState</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Project.html\" data-type=\"entity-link\" >Project</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ProjectDto.html\" data-type=\"entity-link\" >ProjectDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ProjectState.html\" data-type=\"entity-link\" >ProjectState</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/RegisterRequestDto.html\" data-type=\"entity-link\" >RegisterRequestDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ResetPasswordRequestDto.html\" data-type=\"entity-link\" >ResetPasswordRequestDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Role.html\" data-type=\"entity-link\" >Role</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/RoleState.html\" data-type=\"entity-link\" >RoleState</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Team.html\" data-type=\"entity-link\" >Team</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/TeamDto.html\" data-type=\"entity-link\" >TeamDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/TeamState.html\" data-type=\"entity-link\" >TeamState</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Token.html\" data-type=\"entity-link\" >Token</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/TokenDto.html\" data-type=\"entity-link\" >TokenDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/User.html\" data-type=\"entity-link\" >User</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/UserDto.html\" data-type=\"entity-link\" >UserDto</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#miscellaneous-links"' : 'data-bs-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/enumerations.html\" data-type=\"entity-link\">Enums</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/functions.html\" data-type=\"entity-link\">Functions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/variables.html\" data-type=\"entity-link\">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <a data-type=\"chapter-link\" href=\"coverage.html\"><span class=\"icon ion-ios-stats\"></span>Documentation coverage</a>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\" rel=\"noopener noreferrer\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);
  return _class;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));