/*
    PHAISTOS (Front-end for J.A.P with integrated Vulcan & Sensei from micro-MVC)

    File name: phaistos.js (Version: 1.1)
    Description: This file contains the PHAISTOS extension.

    Coded by George Delaportas (G0D)
    Copyright (C) 2015 - 2022
    Open Software License (OSL 3.0)
*/

// PHAISTOS
function phaistos()
{
    // Vulcan
    function vulcan()
    {
        function validation()
        {
            function alpha()
            {
                var __self = this;

                this.is_string = function(val)
                {
                    if (typeof val !== 'string')
                        return false;

                    return true;
                };

                this.is_symbol = function(val)
                {
                    if (!__self.is_string(val))
                        return false;

                    if (val.match(/[!$%^&*()+\-|~=`{}\[\]:";'<>?,\/]/))
                        return true;

                    return false;
                };

                this.is_blank = function(val)
                {
                    if (!__self.is_string(val))
                        return false;

                    if (!val.trim())
                        return true;

                    return false;
                };
            }

            function numerics()
            {
                var __self = this;

                this.is_number = function(val)
                {
                    if (self.validation.misc.is_array(val) && val.length === 0)
                        return false;

                    if (!isNaN(val - parseFloat(val)))
                        return true;

                    return false;
                };

                this.is_integer = function(val)
                {
                    if (__self.is_number(val) && (val % 1 === 0) && !self.misc.contains('.', val.toString()))
                        return true;

                    return false;
                };

                this.is_float = function(val)
                {
                    if (val === 0.0)
                        return true;

                    if (__self.is_number(val) && (val % 1 !== 0))
                        return true;

                    return false;
                };
            }

            function misc()
            {
                var __self = this;

                this.is_undefined = function(val)
                {
                    if (val === undefined)
                        return true;

                    return false;
                };

                this.is_nothing = function(val)
                {
                    if (val === null || val === '')
                        return true;

                    return false;
                };

                this.is_bool = function(val)
                {
                    if (typeof val === 'boolean')
                        return true;

                    return false;
                };

                this.is_array = function(val)
                {
                    if (Array.isArray(val))
                        return true;

                    return false;
                };

                this.is_function = function(val)
                {
                    if (typeof val === 'function')
                        return true;

                    return false;
                };

                this.is_object = function(val)
                {
                    if (typeof val === 'object')
                        return true;

                    return false;
                };

                this.is_invalid = function(val)
                {
                    if (__self.is_undefined(val) || __self.is_nothing(val))
                        return true;

                    return false;
                };
            }

            function utilities()
            {
                this.is_email = function(val)
                {
                    var __pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                    return __pattern.test(String(val).toLowerCase());
                };

                this.is_phone = function(val)
                {
                    var __pattern = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;

                    return __pattern.test(String(val).toLowerCase());
                };

                this.reg_exp = function(pattern, expression)
                {
                    return pattern.test(String(expression)).toLowerCase();
                };
            }

            this.alpha = new alpha();
            this.numerics = new numerics();
            this.misc = new misc();
            this.utilities = new utilities();
        }

        function events()
        {
            function controller()
            {
                var __controlling_list = [];

                function caller_model()
                {
                    this.caller_id = null;
                    this.object_events = [];
                }

                function object_events_model()
                {
                    this.object = null;
                    this.events = [];
                }

                function final_event(caller_index, object_index, event_index, func)
                {
                    var __result = __controlling_list[caller_index].object_events[object_index].events[event_index][func];

                    __controlling_list[caller_index].object_events[object_index].events.splice(event_index, 1);

                    return __result;
                }

                this.insert = function(caller_id, object, func, handler)
                {
                    var __counter_i = 0,
                        __counter_j = 0,
                        __callers = __controlling_list.length,
                        __this_control_list = null,
                        __objects_num = 0,
                        __func_handler = [];

                    for (__counter_i = 0; __counter_i < __callers; __counter_i++)
                    {
                        __this_control_list = __controlling_list[__counter_i];

                        if (__this_control_list.caller_id === caller_id)
                        {
                            __objects_num = __this_control_list.object_events.length;

                            for (__counter_j = 0; __counter_j < __objects_num; __counter_j++)
                            {
                                if (__this_control_list.object_events[__counter_j].object === object)
                                {
                                    __func_handler[func] = handler;

                                    __this_control_list.object_events[__counter_j].events.push(__func_handler);

                                    return true;
                                }
                            }
                        }
                    }

                    var __new_caller_model = new caller_model(),
                        __new_object_events_model = new object_events_model();

                    __func_handler[func] = handler;

                    __new_object_events_model.object = object;
                    __new_object_events_model.events.push(__func_handler);

                    __new_caller_model.caller_id = caller_id;
                    __new_caller_model.object_events.push(__new_object_events_model);

                    __controlling_list.push(__new_caller_model);

                    return true;
                };

                this.fetch = function(caller_id, object, func, handler)
                {
                    var __counter_i = 0,
                        __counter_j = 0,
                        __counter_k = 0,
                        __callers = __controlling_list.length,
                        __objects_num = 0,
                        __control_list_i = null,
                        __control_list_j = null,
                        __control_list_k = null;

                    for (__counter_i = 0; __counter_i < __callers; __counter_i++)
                    {
                        __control_list_i = __controlling_list[__counter_i];

                        if (__control_list_i.caller_id === caller_id)
                        {
                            __objects_num = __control_list_i.object_events.length;

                            for (__counter_j = 0; __counter_j < __objects_num; __counter_j++)
                            {
                                __control_list_j = __control_list_i.object_events[__counter_j];

                                if (__control_list_j.object === object)
                                {
                                    var __events = __control_list_j.events.length;

                                    for (__counter_k = 0; __counter_k < __events; __counter_k++)
                                    {
                                        __control_list_k = __control_list_j.events[__counter_k];

                                        if (self.validation.misc.is_invalid(handler))
                                        {
                                            if (self.validation.misc.is_undefined(__control_list_k[func]))
                                                continue;

                                            return final_event(__counter_i, __counter_j, __counter_k, func);
                                        }
                                        else
                                        {
                                            if (self.validation.misc.is_undefined(__control_list_k[func]))
                                                continue;

                                            if (!self.validation.misc.is_function(handler))
                                                return false;

                                            var __this_handler = __control_list_k[func];

                                            if (__this_handler.toString() === handler.toString())
                                                return final_event(__counter_i, __counter_j, __counter_k, func);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    return false;
                };
            }

            this.attach = function(caller_id, object, func, handler)
            {
                if (self.validation.alpha.is_symbol(caller_id) || 
                    self.validation.misc.is_invalid(object) || !self.validation.misc.is_object(object) || 
                    self.validation.alpha.is_symbol(func) || !self.validation.misc.is_function(handler))
                    return false;

                if (object.tagName === 'SELECT' || 
                    self.validation.misc.is_undefined(object.length) || 
                    self.validation.misc.is_undefined(object.item)) // Single element
                {
                    if (!__controller.insert(caller_id, object, func, handler))
                        return false;

                    object.addEventListener(func, handler, false);
                }
                else // Multiple elements
                {
                    var __counter_i = 0,
                        __object_length = object.length;

                    for (__counter_i = 0; __counter_i < __object_length; __counter_i++)
                    {
                        if (!__controller.insert(caller_id, object[__counter_i], func, handler))
                            return false;

                        object[__counter_i].addEventListener(func, handler, false);
                    }
                }

                return true;
            };

            this.detach = function(caller_id, object, func, handler)
            {
                if (self.validation.alpha.is_symbol(caller_id) || 
                    self.validation.misc.is_invalid(object) || !self.validation.misc.is_object(object) ||
                    self.validation.alpha.is_symbol(func))
                    return false;

                var __handler = null;

                if (object.tagName === 'SELECT' || 
                    self.validation.misc.is_undefined(object.length) || 
                    self.validation.misc.is_undefined(object.item)) // Single element
                {
                    __handler = __controller.fetch(caller_id, object, func, handler);

                    if (!__handler)
                        return false;

                    object.removeEventListener(func, __handler, false);
                }
                else // Multiple elements
                {
                    var __counter_i = 0,
                        __object_length = object.length;

                    for (__counter_i = 0; __counter_i < __object_length; __counter_i++)
                    {
                        __handler = __controller.fetch(caller_id, object[__counter_i], func, handler);

                        if (!__handler)
                            return false;

                        object[__counter_i].removeEventListener(func, __handler, false);
                    }
                }

                return true;
            };

            var __controller = new controller();
        }

        function conversions()
        {
            this.object_to_array = function(conversion_mode, model)
            {
                return Object.keys(model).map(function(key)
                                            {
                                                if (conversion_mode === true)
                                                    return [key, model[key]];
                                                else
                                                    return model[key];
                                            });
            };

            this.replace_link = function(mode, text, attributes, url_info)
            {
                if (!self.validation.numerics.is_integer(mode) || mode < 0 || mode > 2 || !self.validation.alpha.is_string(text))
                    return false;

                if (!self.validation.misc.is_undefined(attributes))
                {
                    if (attributes !== null)
                    {
                        if (!self.validation.misc.is_object(attributes))
                            return false;

                        var __this_attribute = null,
                            __final_attributes = null,
                            __valid_attributes = ['id', 'class', 'style', 'title', 'dir', 'lang', 'accesskey', 'tabindex', 
                                                'contenteditable', 'draggable', 'spellcheck', 'target', 'rel'];

                        for (__this_attribute in attributes)
                        {
                            if (!self.misc.contains(__this_attribute, __valid_attributes) && __this_attribute.indexOf('data-') !== 0)
                                return false;

                            __final_attributes += __this_attribute + '="' + attributes[__this_attribute] + '" ';
                        }
                    }
                }

                if (mode === 1)
                {
                    var __match = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

                    if (self.validation.misc.is_undefined(__final_attributes))
                        return text.replace(__match, "<a href='$1'>$1</a>");
                    else
                        return text.replace(__match, "<a " + __final_attributes + "href='$1'>$1</a>");
                }
                else if (mode === 2)
                {
                    if (self.validation.misc.is_undefined(url_info) || !self.validation.misc.is_object(url_info))
                        return false;

                    var __counter_i = 0,
                        __url_info_length = url_info.length;

                    for (__counter_i = 0; __counter_i < __url_info_length; __counter_i++ )
                    {   
                        if (!self.validation.misc.is_object(url_info[__counter_i]))
                            return false;

                        if (self.validation.misc.is_undefined(__final_attributes))
                        {
                            text = text.replace(url_info[__counter_i].expanded_url, 
                                                '<a href="' + url_info[__counter_i].expanded_url + '">' + 
                                                url_info[__counter_i].display_url + '</a>');
                        }
                        else
                        {
                            text = text.replace(url_info[__counter_i].expanded_url, 
                                                '<a ' + __final_attributes + 'href="' + 
                                                url_info[__counter_i].expanded_url + '">' + 
                                                url_info[__counter_i].display_url + '</a>');
                        }
                    }

                    return text;
                }
                else
                    return false;
            };
        }

        function graphics()
        {
            this.pixels_value = function(pixels)
            {
                var __result = null;

                __result = parseInt(pixels.substring(0, pixels.length - 2), 10);

                if (!self.validation.numerics.is_integer(__result))
                    return false;

                return __result;
            };

            this.apply_theme = function(directory, theme)
            {
                if (self.validation.misc.is_invalid(directory) || self.validation.alpha.is_symbol(theme))
                    return false;

                if (self.validation.misc.is_undefined(theme))
                    theme = 'default';

                if (self.system.source_exists(theme, 'link', 'href'))
                    return false;

                var __dynamic_object = null;

                __dynamic_object = document.createElement('link');
                __dynamic_object.setAttribute('rel', 'stylesheet');
                __dynamic_object.setAttribute('type', 'text/css');
                __dynamic_object.setAttribute('media', 'screen');
                __dynamic_object.setAttribute('href', directory + '/' + theme + '.css');

                self.objects.by_tag('head')[0].appendChild(__dynamic_object);

                return true;
            };
        }

        function misc()
        {
            var __self = this;

            this.contains = function(subject, list)
            {
                if (list.indexOf(subject) === -1)
                    return false;

                return true;
            };

            this.sort = function(array, mode, by_property)
            {
                var __modes = ['asc', 'desc'],
                    __order = null,
                    __result = null;

                if (!self.validation.misc.is_array(array) || !__self.contains(mode, __modes) || 
                    (!self.validation.misc.is_invalid(by_property) && !self.validation.alpha.is_string(by_property)))
                    return false;

                if (mode === 'asc')
                    __order = 1;
                else
                    __order = -1;

                if (self.validation.misc.is_invalid(by_property))
                    __result = array.sort(function(a, b) { return __order * (a - b); });
                else
                    __result = array.sort(function(a, b) { return __order * (a[by_property] - b[by_property]); });

                return __result;
            };
        }

        function objects()
        {
            this.by_tag = function(html_tag)
            {
                if (self.validation.misc.is_invalid(html_tag))
                    return false;

                return document.getElementsByTagName(html_tag);
            };

            this.by_id = function(id)
            {
                if (self.validation.misc.is_invalid(id))
                    return false;

                return document.getElementById(id);
            };

            this.by_class = function(class_name)
            {
                if (self.validation.misc.is_invalid(class_name))
                    return false;

                return document.getElementsByClassName(class_name);
            };

            function selectors()
            {
                this.first = function(query)
                {
                    if (self.validation.misc.is_invalid(query))
                        return false;

                    return document.querySelector(query);
                };

                this.all = function(query)
                {
                    if (self.validation.misc.is_invalid(query))
                        return false;

                    return document.querySelectorAll(query);
                };
            }

            this.selectors = new selectors();
        }

        function system()
        {
            var __self = this;

            this.require = function(js_file_path, js_file_name)
            {
                if (self.validation.misc.is_invalid(js_file_path) || 
                    self.validation.misc.is_invalid(js_file_name) || self.validation.alpha.is_symbol(js_file_name))
                    return false;

                if (__self.source_exists(js_file_name, 'script', 'src'))
                    return false;

                var __dynamic_object = null;

                __dynamic_object = document.createElement('script');
                __dynamic_object.setAttribute('src', js_file_path + '/' + js_file_name + '.js');

                self.objects.by_tag('head')[0].appendChild(__dynamic_object);

                return true;
            };

            this.source_exists = function(file_name, tag_type, attribute)
            {
                if (self.validation.misc.is_invalid(file_name) || self.validation.alpha.is_symbol(file_name) || 
                    self.validation.misc.is_invalid(tag_type) || self.validation.alpha.is_symbol(tag_type) || 
                    self.validation.misc.is_invalid(attribute) || self.validation.alpha.is_symbol(attribute))
                    return false;

                var __counter_i = 0,
                    __sources = document.head.getElementsByTagName(tag_type);

                for (__counter_i = 0; __counter_i < __sources.length; __counter_i++)
                {
                    if (__sources[__counter_i].attributes[attribute].value.indexOf(file_name) > -1)
                        return true;
                }

                return false;
            };
        }

        function init()
        {
            self.validation = new validation();
            self.events = new events();
            self.conversions = new conversions();
            self.graphics = new graphics();
            self.misc = new misc();
            self.objects = new objects();
            self.system = new system();
        }

        var self = this;

        // Intialize
        init();
    }

    // Sensei
    function sensei(title, message)
    {
        var __index = 0,
            __stars = '',
            utils = new vulcan();

        if ((!utils.validation.misc.is_invalid(title) && !utils.validation.alpha.is_string(title)) || 
            (!utils.validation.misc.is_invalid(message) && !utils.validation.alpha.is_string(message)))
            return false;

        for (__index = 0; __index < title.length - 2; __index++)
            __stars += '*';

        console.log('-------------------------- ' + title + ' --------------------------');
        console.log(message);
        console.log('--------------------------  ' + __stars + '  --------------------------');
        console.log('');

        return true;
    }

    // Scan for unknown keywords
    function has_unknown_keywords(definition_model)
    {
        if (!utils.validation.misc.is_object(definition_model))
            return false;

        var __index = null,
            __attribute = null,
            __option = null,
            __property = null;

        for (__index in definition_model)
        {
            __attribute = definition_model[__index];

            if (!utils.validation.misc.is_object(__attribute))
            {
                if (!utils.misc.contains(__index, def_keywords))
                    return true;

                continue;
            }

            if ((utils.validation.misc.is_object(__attribute) && Object.getOwnPropertyNames(__attribute).length === 0) || 
                (utils.validation.misc.is_array(__attribute) && __attribute.length === 0))
                return true;

            for (__option in __attribute)
            {
                if (utils.validation.misc.is_object(__attribute[__option]))
                {
                    for (__property in __attribute[__option])
                    {
                        if (utils.validation.numerics.is_number(__option))
                            continue;

                        if (!utils.misc.contains(__property, def_keywords))
                            return true;

                        if (has_unknown_keywords(__attribute[__option][__property]))
                            return true;
                    }
                }
                else
                {
                    if (!utils.misc.contains(__option, def_keywords))
                        return true;

                    if (has_unknown_keywords(__attribute[__option]))
                        return true;
                }
            }
        }

        return false;
    }

    // Define the configuration
    this.define = function(definition_model)
    {
        if (!utils.validation.misc.is_object(definition_model))
        {
            sensei('PHAISTOS', 'Invalid definition model!');

            return false;
        }

        if (definition_model.length === 0)
        {
            sensei('PHAISTOS', 'The definition model is null!');

            return false;
        }

        if (has_unknown_keywords(definition_model))
        {
            sensei('PHAISTOS', 'The definition model contains unknown keywords!');

            return false;
        }

        var __this_key = null,
            __this_value = null;

        is_model_defined = false;

        if (definition_model.hasOwnProperty('ignore_keys_num') && !utils.validation.misc.is_bool(definition_model.ignore_keys_num))
        {
            sensei('PHAISTOS', 'Missing or invalid "ignore_keys_num" attribute!');

            return false;
        }

        if (!definition_model.hasOwnProperty('arguments') || !utils.validation.misc.is_object(definition_model.arguments))
        {
            sensei('PHAISTOS', 'Missing or invalid "arguments" attribute!');

            return false;
        }

        def_model_args = definition_model.arguments;

        for (counter = 0; counter < def_model_args.length; counter++)
        {
            if (!utils.validation.misc.is_object(def_model_args[counter]))
            {
                sensei('PHAISTOS', 'Invalid JSON object in "arguments" attribute!');

                return false;
            }

            if (!def_model_args[counter].hasOwnProperty('key') || !def_model_args[counter].hasOwnProperty('value'))
            {
                sensei('PHAISTOS', 'Missing "key" or "value" mandatory attributes!');

                return false;
            }

            __this_key = def_model_args[counter].key;
            __this_value = def_model_args[counter].value;

            if (!utils.validation.misc.is_object(__this_key) || !utils.validation.misc.is_object(__this_value))
            {
                sensei('PHAISTOS', 'A "key" or "value" attribute does not point to a JSON object!');

                return false;
            }

            if (!__this_key.hasOwnProperty('name') || !__this_key.hasOwnProperty('optional'))
            {
                sensei('PHAISTOS', 'Missing "name" or "optional" mandatory properties!');

                return false;
            }

            if (!utils.validation.alpha.is_string(__this_key.name) || !utils.validation.misc.is_bool(__this_key.optional))
            {
                sensei('PHAISTOS', 'Invalid specification for "name" or "optional" property!');

                return false;
            }

            if (!__this_value.hasOwnProperty('type'))
            {
                sensei('PHAISTOS', 'Missing "type" mandatory property!');

                return false;
            }

            if (!utils.validation.alpha.is_string(__this_value.type) || !utils.misc.contains(__this_value.type, all_value_types))
            {
                sensei('PHAISTOS', 'Invalid specification for "type" property!');

                return false;
            }

            if (__this_value.hasOwnProperty('choices'))
            {
                if (!utils.misc.contains(__this_value.type, types_with_choices))
                {
                    sensei('PHAISTOS', 'This type does not support the "choices" option!');

                    return false;
                }

                if (!utils.validation.misc.is_array(__this_value.choices) || __this_value.choices.length < 1)
                {
                    sensei('PHAISTOS', 'The "choices" option has to be an array with at least\none element!');

                    return false;
                }
            }

            if (__this_value.hasOwnProperty('length'))
            {
                if (utils.misc.contains(__this_value.type, uncountable_value_types))
                {
                    sensei('PHAISTOS', 'This type does not support the "length" option!');

                    return false;
                }

                if (!utils.validation.numerics.is_integer(__this_value.length) || __this_value.length < 1)
                {
                    sensei('PHAISTOS', 'The "length" option has to be a positive integer!');

                    return false;
                }
            }

            if (__this_value.hasOwnProperty('regex'))
            {
                if (utils.misc.contains(__this_value.type, uncountable_value_types) || __this_value.type === 'array')
                {
                    sensei('PHAISTOS', 'This type does not support the "regex" option!');

                    return false;
                }

                if (!utils.validation.misc.is_object(__this_value.regex) || __this_value.regex === '')
                {
                    sensei('PHAISTOS', 'Invalid "regex" option!');

                    return false;
                }
            }
        }

        is_model_defined = true;
        json_def_model = definition_model;

        return true;
    };

    // Validate configuration based on the definition model
    this.validate = function(config)
    {
        if (!is_model_defined)
        {
            sensei('PHAISTOS', 'No definition model was specified!');

            return false;
        }

        if (!utils.validation.misc.is_object(config))
        {
            sensei('PHAISTOS', 'Invalid JSON object!');

            return false;
        }

        var __json_key = null,
            __this_key = null,
            __this_value = null,
            __is_multiple_keys_array = false,
            __keys_exist = 0,
            __mandatory_keys_not_found = 0,
            __model_keywords = [];

        def_model_args = json_def_model.arguments;

        if (utils.validation.misc.is_array(config))
            __is_multiple_keys_array = true;

        for (counter = 0; counter < def_model_args.length; counter++)
        {
            for (__json_key in def_model_args[counter])
            {
                if (!utils.validation.misc.is_undefined(def_model_args[counter][__json_key].name))
                    __model_keywords.push(def_model_args[counter][__json_key].name);
            }
        }

        for (__json_key in config)
        {
            if (__is_multiple_keys_array)
                __mandatory_keys_not_found = 0;

            for (counter = 0; counter < def_model_args.length; counter++)
            {
                __this_key = def_model_args[counter].key;

                if (__is_multiple_keys_array)
                {
                    for (__this_value in config[__json_key])
                    {
                        if (!utils.misc.contains(__this_value, __model_keywords))
                        {
                            sensei('PHAISTOS', 'Unknown keyword: "' + __this_value + '" in the configuration model!');
            
                            return false;
                        }
                    }
                }
                else
                {
                    if (!utils.misc.contains(__json_key, __model_keywords))
                    {
                        sensei('PHAISTOS', 'Unknown keyword: "' + __json_key + '" in the configuration model!');
        
                        return false;
                    }
                }

                if (__this_key.optional === false)
                {
                    if (__is_multiple_keys_array)
                    {
                        if (!config[__json_key].hasOwnProperty(__this_key.name))
                            __mandatory_keys_not_found++;
                    }
                    else
                    {
                        if (!config.hasOwnProperty(__this_key.name))
                            __mandatory_keys_not_found++;
                    }
                }
            }

            if (__is_multiple_keys_array && __mandatory_keys_not_found > 0)
                break;

            __keys_exist++;
        }

        if ((!json_def_model.hasOwnProperty('ignore_keys_num') || json_def_model.ignore_keys_num === false) && 
            __mandatory_keys_not_found > 0)
        {
            sensei('PHAISTOS', 'Mandatory properties are missing!');

            return false;
        }

        if (__keys_exist === 0)
        {
            sensei('PHAISTOS', 'The JSON object is null!');

            return false;
        }

        for (counter = 0; counter < def_model_args.length; counter++)
        {
            __this_key = def_model_args[counter].key;
            __this_value = def_model_args[counter].value;

            if (__this_value.type !== '*')
            {
                if (__this_value.type === 'null')
                {
                    if (config[__this_key.name] !== null)
                    {
                        sensei('PHAISTOS', 'Argument: "' + __this_key.name + '" accepts only "null" values!');

                        return false;
                    }
                }
                else if (__this_value.type === 'number')
                {
                    if (__is_multiple_keys_array)
                    {
                        for (__json_key in config)
                        {
                            if (utils.validation.misc.is_undefined(config[__json_key][__this_key.name]))
                                continue;

                            if (utils.validation.misc.is_nothing(config[__json_key][__this_key.name].toString().trim()) || 
                                !utils.validation.numerics.is_number(Number(config[__json_key][__this_key.name])))
                            {
                                sensei('PHAISTOS', 'Argument: "' + __this_key.name + '" accepts only "numeric" values!');

                                return false;
                            }
                        }
                    }
                    else
                    {
                        if (utils.validation.misc.is_undefined(config[__this_key.name]))
                            continue;

                        if (utils.validation.misc.is_nothing(config[__this_key.name].toString().trim()) || 
                            !utils.validation.numerics.is_number(Number(config[__this_key.name])))
                        {
                            sensei('PHAISTOS', 'Argument: "' + __this_key.name + '" accepts only "numeric" values!');

                            return false;
                        }
                    }
                }
                else if (__this_value.type === 'array')
                {
                    if (!utils.validation.misc.is_array(config[__this_key.name]))
                    {
                        sensei('PHAISTOS', 'Argument: "' + __this_key.name + '" accepts only "array" values!');

                        return false;
                    }
                }
                else
                {
                    if (__is_multiple_keys_array)
                    {
                        for (__json_key in config)
                        {
                            if (utils.validation.misc.is_undefined(config[__json_key][__this_key.name]))
                                continue;

                            if (typeof config[__json_key][__this_key.name] !== __this_value.type)
                            {
                                sensei('PHAISTOS', 'Argument: "' + __this_key.name + '" has a type mismatch!');

                                return false;
                            }
                        }
                    }
                    else
                    {
                        if (utils.validation.misc.is_undefined(config[__this_key.name]))
                            continue;

                        if (typeof config[__this_key.name] !== __this_value.type)
                        {
                            sensei('PHAISTOS', 'Argument: "' + __this_key.name + '" has a type mismatch!');

                            return false;
                        }
                    }
                }
            }

            if (__this_value.hasOwnProperty('choices'))
            {
                if (__is_multiple_keys_array)
                {
                    for (__json_key in config)
                    {
                        if (utils.validation.misc.is_undefined(config[__json_key][__this_key.name]))
                            continue;

                        if (!utils.misc.contains(config[__json_key][__this_key.name], __this_value.choices))
                        {
                            sensei('PHAISTOS', 'Argument: "' + __this_key.name + '" does not contain any\ndefined choices!');

                            return false;
                        }
                    }
                }
                else
                {
                    if (utils.validation.misc.is_undefined(config[__this_key.name]))
                        continue;

                    if (!utils.misc.contains(config[__this_key.name], __this_value.choices))
                    {
                        sensei('PHAISTOS', 'Argument: "' + __this_key.name + '" does not contain any\ndefined choices!');
    
                        return false;
                    }
                }
            }

            if (__this_value.hasOwnProperty('length'))
            {
                if (__this_value.type === 'array')
                {
                    if (config[__this_key.name].length > __this_value.length)
                    {
                        sensei('PHAISTOS', 'Argument: "' + __this_key.name + '" has exceeded the defined length!');

                        return false;
                    }
                }
                else
                {
                    if (config[__this_key.name].toString().length > __this_value.length)
                    {
                        sensei('PHAISTOS', 'Argument: "' + __this_key.name + '" has exceeded the defined length!');

                        return false;
                    }
                }
            }

            if (__this_value.hasOwnProperty('regex'))
            {
                if (!utils.validation.utilities.reg_exp(__this_value.regex, config[__this_key.name]))
                {
                    sensei('PHAISTOS', 'Argument: "' + __this_key.name + '" has not matched the specified regex!');

                    return false;
                }
            }
        }

        return true;
    };

    // Define and validate at once
    this.verify = function(definition_model, config)
    {
        if (self.define(definition_model))
            return self.validate(config);

        return false;
    };

    var self = this,
        is_model_defined = false,
        counter = 0,
        json_def_model = null,
        def_model_args = null,
        def_keywords = ['ignore_keys_num', 'arguments', 'key', 'value', 'name', 'optional', 'type', 'choices', 'length', 'regex'],
        all_value_types = ['number', 'string', 'boolean', 'array', 'object', 'function', 'null', '*'],
        uncountable_value_types = ['boolean', 'object', 'function', 'null', '*'],
        types_with_choices = ['number', 'string', 'array'],
        utils = new vulcan();
}
