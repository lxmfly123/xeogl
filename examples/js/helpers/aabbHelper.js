/**

 Helper that visualizes the boundary of a target {{#crossLink "Component"}}{{/crossLink}} subtype with a World-space axis-aligned boundary (AABB).

 @class AABBHelper
 @constructor
 @param cfg {*} Configuration
 @param [cfg.target] {Number|String|Component} ID or instance of a {{#crossLink "Component"}}{{/crossLink}} subtype with a World-space axis-aligned boundary (AABB).
 @param [cfg.color=[0.4,0.4,0.4]] {Float32Array} Emmissive color
 @param [cfg.visible=true] {Boolean} Indicates whether or not this helper is visible.

 */
(function () {

    "use strict";

    xeogl.AABBHelper = xeogl.Component.extend({

        type: "xeogl.AABBHelper",

        _init: function (cfg) {

            this._box = new xeogl.Entity(this, {
                geometry: new xeogl.AABBGeometry(this),
                material: new xeogl.PhongMaterial(this, {
                    emissive: [1, 0, 0],
                    diffuse: [0, 0, 0],
                    lineWidth: 4
                }),
                pickable: false,
                collidable: false,
                clippable: false
            });

            this.target = cfg.target;
            this.color = cfg.color;
            this.visible = cfg.visible;
        },

        _props: {

            /**
             * The target {{#crossLink "Component"}}{{/crossLink}} subtype.
             *
             * Must be within the same {{#crossLink "Scene"}}{{/crossLink}} as this CameraFollowAnimation. Defaults to the parent
             * {{#crossLink "Scene"}}Scene{{/crossLink}} when set to a null or undefined value.
             *
             * @property target
             * @type Component
             */
            target: {

                set: function (target) {
                  this._box.geometry.target = target;
                },

                get: function () {
                    return this._box.geometry.target;
                }
            },

            /**
             * Emissive color of this AABBHelper.
             *
             * Fires an {{#crossLink "AABBHelper/color:event"}}{{/crossLink}} event on change.
             *
             * @property color
             * @default [0,1,0]
             * @type {Float32Array}
             */
            color: {

                set: function (value) {

                    this._box.material.emissive = value || [0, 1, 0];

                    /**
                     Fired whenever this AABBHelper's {{#crossLink "AABBHelper/color:property"}}{{/crossLink}} property changes.
                     @event color
                     @param value {Float32Array} The property's new value
                     */
                    this.fire("color", this._color);
                },

                get: function () {
                    return this._box.emissive;
                }
            },

            /**
             Indicates whether this AABBHelper is visible or not.

             Fires a {{#crossLink "AABBHelper/visible:event"}}{{/crossLink}} event on change.

             @property visible
             @default true
             @type Boolean
             */
            visible: {

                set: function (value) {

                    value = value !== false;

                    this._box.visible = value;

                    /**
                     Fired whenever this helper's {{#crossLink "AABBHelper/visible:property"}}{{/crossLink}} property changes.

                     @event visible
                     @param value {Boolean} The property's new value
                     */
                    this.fire("visible", this._box.visible);
                },

                get: function () {
                    return this._box.visible;
                }
            }
        }
    });
})();