window.addEventListener('windowloaded', function () {
      document.getElementById("copy-output").onclick = copy_output;
      document.getElementById("editor-reset").onclick = resetValues;
      document.getElementById("load-input").onclick = loadInput;
      document.getElementById("editor-input-toggle").onclick = toggle_input;
      document.getElementById("editor-change-toggle").onclick = toggle_showChange;
      document.getElementById("change-to-nothing").onclick = function() {change_mode(0)};
      document.getElementById("change-to-added").onclick = function() {change_mode(1)};
      document.getElementById("change-to-modified").onclick = function() {change_mode(2)};
      document.getElementById("change-to-alias").onclick = function() {change_mode(3)};
      document.getElementById("change-to-customtab").onclick = function() {change_mode(4)};
      document.getElementById("change-to-customsizes").onclick = function() {change_mode(5)};
      document.getElementById("change-to-custombiofuels").onclick = function() {change_mode(6)};
      document.getElementById("change-to-customfragmentcounts").onclick = function() {change_mode(7)};
      document.getElementById("change-to-moved").onclick = function() {change_mode(8)};

      document.getElementById("editor-recipe-add-confirm").onclick = new_recipe;
      document.getElementById("editor-recipe-add-ingredient-confirm").onclick = new_ingredient;
      document.getElementById("editor-recipe-add-linked-confirm").onclick = new_linked;
      document.getElementById("editor-recipe-add-unlock-confirm").onclick = new_unlock;

      document.getElementById("editor-customtab-add-confirm").onclick = new_craftingtab;
      document.getElementById("editor-customsize-add-confirm").onclick = new_customsize;
      document.getElementById("editor-custombiofuels-add-confirm").onclick = new_custombiofuel;
      document.getElementById("editor-customfragmentcounts-add-confirm").onclick = new_customfragmentcount;
      document.getElementById("editor-movedrecipes-add-confirm").onclick = new_movedrecipe;


      change_mode(0);
      update_input_visibility();
      update_change_visibility();
      outputData();
});

function outputData() {
      var outp = document.getElementById("code-output");
      var strings = "";
      if (outputMode === 1) {
            var __o = new OutputData(_addedRecipes,1);
            strings = toCString(__o);
      } else if (outputMode === 2) {
            var __o = new OutputData(_modifiedRecipes,2);
            strings = toCString(__o);
      } else if (outputMode === 3) {
            var __o = new OutputData(_aliasRecipes,3);
            strings = toCString(__o);
      } else if (outputMode === 4) {
            var __o = new OutputData(_customCraftingTabs,4);
            strings = toCString(__o);
      } else if (outputMode === 5) {
            var __o = new OutputData(_customItemSizes,5);
            strings = toCString(__o);
      } else if (outputMode === 6) {
            var __o = new OutputData(_customBioFuels,6);
            strings = toCString(__o);
      } else if (outputMode === 7) {
            var __o = new OutputData(_customFragmentCounts,7);
            strings = toCString(__o);
      } else if (outputMode === 8) {
            var __o = new OutputData(_movedRecipes,8);
            strings = toCString(__o);
      }
      outp.innerHTML = strings;
      c_update_recipeList();
      c_update_customtabList();
      c_update_customsizeList();
      c_update_custombiofuelList();
      c_update_customfragmentcountList();
      c_update_movedrecipeList();
}

function copy_output() {
      clearSelection();
      document.getElementById("code-output").select();
      document.execCommand("copy");
      clearSelection();
}

function clearSelection()
{
      if (window.getSelection) {window.getSelection().removeAllRanges();}
      else if (document.selection) {document.selection.empty();}
}

function new_recipe() {
      var t_id = document.getElementById("editor-recipe-add-id").value;
      var t_amount = document.getElementById("editor-recipe-add-amount").value;
      var t_forceunlock = document.getElementById("editor-recipe-add-forceunlock").checked;
      var t_forceunlockdefault = document.getElementById("editor-recipe-add-forceunlock-default").checked;
      var t_path = document.getElementById("editor-recipe-add-path").value;
      var t_displayname = document.getElementById("editor-recipe-add-display").value;
      var t_tooltip = document.getElementById("editor-recipe-add-tooltip").value;
      var t_pdagroup = document.getElementById("editor-recipe-add-pdagroup").value;
      var t_pdacategory = document.getElementById("editor-recipe-add-pdacategory").value;
      var t_functionalid = document.getElementById("editor-recipe-add-functionalid").value;
      var _recipe = new Recipe(t_id,t_amount,temp_Ingredients,temp_Linked,t_forceunlock,t_forceunlockdefault,temp_Unlock,t_path,t_displayname,t_tooltip,t_pdagroup,t_pdacategory,t_functionalid);
      if (outputMode === 1) {
            _addedRecipes.push(_recipe);
      }
      if (outputMode === 2) {
            _modifiedRecipes.push(_recipe);
      }
      if (outputMode === 3) {
            _aliasRecipes.push(_recipe);
      }
      temp_Ingredients = [];
      temp_Linked = [];
      temp_Unlock = [];
      document.getElementById("editor-recipe-add-id").value = "";
      document.getElementById("editor-recipe-add-amount").value = 0;
      document.getElementById("editor-recipe-add-forceunlock").checked = true;
      document.getElementById("editor-recipe-add-forceunlock-default").checked = true;
      document.getElementById("editor-recipe-add-path").value = "";
      document.getElementById("editor-recipe-add-display").value = "";
      document.getElementById("editor-recipe-add-tooltip").value = "";
      document.getElementById("editor-recipe-add-pdagroup").value = "";
      document.getElementById("editor-recipe-add-pdacategory").value = "";
      document.getElementById("editor-recipe-add-functionalid").value = "";
      update_ingredientList();
      update_linkedList();
      update_unlockList();
      outputData();
}

function c_update_recipeList() {
      document.getElementById("editor-recipe-citems-list").innerHTML = "";
      var template = document.getElementById("recipe-clist-template");
      var templateIng = document.getElementById("recipe-clist-ingredient-template");
      var templateLnk = document.getElementById("recipe-clist-linked-template");
      var templateUnl = document.getElementById("recipe-clist-unlock-template");
      if (outputMode === 1) {
            _addedRecipes.forEach((v,i) => {
                  var clone = document.importNode(template.content, true);
                  clone.querySelectorAll(".recipe-clist-id")[0].value = v.id;
                  clone.querySelectorAll(".recipe-clist-id")[0].onchange = function() {c_edit_recipe(i,"id",this.value);};
                  clone.querySelectorAll(".recipe-clist-amount")[0].value = v.amount;
                  clone.querySelectorAll(".recipe-clist-amount")[0].onchange = function() {c_edit_recipe(i,"amount",this.value);};
                  clone.querySelectorAll(".recipe-clist-displayname")[0].value = v.displayname;
                  clone.querySelectorAll(".recipe-clist-displayname")[0].onchange = function() {c_edit_recipe(i,"displayname",this.value);};
                  clone.querySelectorAll(".recipe-clist-tooltip")[0].value = v.tooltip;
                  clone.querySelectorAll(".recipe-clist-tooltip")[0].onchange = function() {c_edit_recipe(i,"tooltip",this.value);};
                  clone.querySelectorAll(".recipe-clist-path")[0].value = v.path;
                  clone.querySelectorAll(".recipe-clist-path")[0].onchange = function() {c_edit_recipe(i,"path",this.value);};
                  clone.querySelectorAll(".recipe-clist-pdagroup")[0].value = v.pdagroup;
                  clone.querySelectorAll(".recipe-clist-pdagroup")[0].onchange = function() {c_edit_recipe(i,"pdagroup",this.value);};
                  clone.querySelectorAll(".recipe-clist-pdacategory")[0].value = v.pdacategory;
                  clone.querySelectorAll(".recipe-clist-pdacategory")[0].onchange = function() {c_edit_recipe(i,"pdacategory",this.value);};
                  clone.querySelectorAll(".recipe-clist-functionalid")[0].value = v.functionalid;
                  clone.querySelectorAll(".recipe-clist-functionalid")[0].onchange = function() {c_edit_recipe(i,"functionalid",this.value);};
                  clone.querySelectorAll(".recipe-clist-forceunlock-default")[0].checked = v.forceunlockdefault ? "checked" : "";
                  clone.querySelectorAll(".recipe-clist-forceunlock-default")[0].onchange = function() {c_edit_recipe(i,"forceunlockdef",this.checked);};
                  clone.querySelectorAll(".recipe-clist-forceunlock")[0].checked = v.forceunlock ? "checked" : "";
                  clone.querySelectorAll(".recipe-clist-forceunlock")[0].onchange = function() {c_edit_recipe(i,"forceunlock",this.checked);};
                  clone.querySelectorAll(".recipe-clist-remove")[0].onclick = function() {c_remove_recipe(i);};
                  clone.querySelectorAll(".recipe-clist-ingredients")[0].innerHTML = "";
                  v.ingredients.forEach((vv,ii) => {
                        var cloneIng = document.importNode(templateIng.content, true);
                        cloneIng.querySelectorAll(".recipe-clist-ingredient-id")[0].value = vv.id;
                        cloneIng.querySelectorAll(".recipe-clist-ingredient-id")[0].onchange = function() {c_edit_recipe_ingredient(i,ii,"id",this.value);};
                        cloneIng.querySelectorAll(".recipe-clist-ingredient-amount")[0].value = vv.amount;
                        cloneIng.querySelectorAll(".recipe-clist-ingredient-amount")[0].onchange = function() {c_edit_recipe_ingredient(i,ii,"amount",this.value);};
                        cloneIng.querySelectorAll(".recipe-clist-ingredient-remove")[0].onclick = function() {c_remove_recipe_ingredient(i,ii);};
                        clone.querySelectorAll(".recipe-clist-ingredients")[0].appendChild(cloneIng);
                  });
                  clone.querySelectorAll(".recipe-clist-ingredients-add")[0].onclick = function() {c_new_recipe_ingredient(i);};
                  clone.querySelectorAll(".recipe-clist-linked")[0].innerHTML = "";
                  v.linkeditems.forEach((vv,ii) => {
                        var cloneLnk = document.importNode(templateLnk.content, true);
                        cloneLnk.querySelectorAll(".recipe-clist-linked-id")[0].value = vv;
                        cloneLnk.querySelectorAll(".recipe-clist-linked-id")[0].onchange = function() {c_edit_recipe_linked(i,ii,this.value);};
                        cloneLnk.querySelectorAll(".recipe-clist-linked-remove")[0].onclick = function() {c_remove_recipe_linked(i,ii);};
                        clone.querySelectorAll(".recipe-clist-linked")[0].appendChild(cloneLnk);
                  });
                  clone.querySelectorAll(".recipe-clist-linked-add")[0].onclick = function() {c_new_recipe_linked(i);};
                  clone.querySelectorAll(".recipe-clist-unlock")[0].innerHTML = "";
                  v.unlocks.forEach((vv,ii) => {
                        var cloneUnl = document.importNode(templateUnl.content, true);
                        cloneUnl.querySelectorAll(".recipe-clist-unlock-id")[0].value = vv;
                        cloneUnl.querySelectorAll(".recipe-clist-unlock-id")[0].onchange = function() {c_edit_recipe_unlock(i,ii,this.value);};
                        cloneUnl.querySelectorAll(".recipe-clist-unlock-remove")[0].onclick = function() {c_remove_recipe_unlock(i,ii);};
                        clone.querySelectorAll(".recipe-clist-unlock")[0].appendChild(cloneUnl);
                  });
                  clone.querySelectorAll(".recipe-clist-unlock-add")[0].onclick = function() {c_new_recipe_unlock(i);};
                  document.getElementById("editor-recipe-citems-list").appendChild(clone);
            });
      } else if (outputMode === 2) {
            _modifiedRecipes.forEach((v,i) => {
                  var clone = document.importNode(template.content, true);
                  clone.querySelectorAll(".recipe-clist-id")[0].value = v.id;
                  clone.querySelectorAll(".recipe-clist-id")[0].onchange = function() {c_edit_recipe(i,"id",this.value);};
                  clone.querySelectorAll(".recipe-clist-amount")[0].value = v.amount;
                  clone.querySelectorAll(".recipe-clist-amount")[0].onchange = function() {c_edit_recipe(i,"amount",this.value);};
                  clone.querySelectorAll(".recipe-clist-displayname")[0].value = v.displayname;
                  clone.querySelectorAll(".recipe-clist-displayname")[0].onchange = function() {c_edit_recipe(i,"displayname",this.value);};
                  clone.querySelectorAll(".recipe-clist-tooltip")[0].value = v.tooltip;
                  clone.querySelectorAll(".recipe-clist-tooltip")[0].onchange = function() {c_edit_recipe(i,"tooltip",this.value);};
                  clone.querySelectorAll(".recipe-clist-path")[0].value = v.path;
                  clone.querySelectorAll(".recipe-clist-path")[0].onchange = function() {c_edit_recipe(i,"path",this.value);};
                  clone.querySelectorAll(".recipe-clist-pdagroup")[0].value = v.pdagroup;
                  clone.querySelectorAll(".recipe-clist-pdagroup")[0].onchange = function() {c_edit_recipe(i,"pdagroup",this.value);};
                  clone.querySelectorAll(".recipe-clist-pdacategory")[0].value = v.pdacategory;
                  clone.querySelectorAll(".recipe-clist-pdacategory")[0].onchange = function() {c_edit_recipe(i,"pdacategory",this.value);};
                  clone.querySelectorAll(".recipe-clist-functionalid")[0].value = v.functionalid;
                  clone.querySelectorAll(".recipe-clist-functionalid")[0].onchange = function() {c_edit_recipe(i,"functionalid",this.value);};
                  clone.querySelectorAll(".recipe-clist-forceunlock-default")[0].checked = v.forceunlockdefault ? "checked" : "";
                  clone.querySelectorAll(".recipe-clist-forceunlock-default")[0].onchange = function() {c_edit_recipe(i,"forceunlockdef",this.checked);};
                  clone.querySelectorAll(".recipe-clist-forceunlock")[0].checked = v.forceunlock ? "checked" : "";
                  clone.querySelectorAll(".recipe-clist-forceunlock")[0].onchange = function() {c_edit_recipe(i,"forceunlock",this.checked);};
                  clone.querySelectorAll(".recipe-clist-remove")[0].onclick = function() {c_remove_recipe(i);};
                  clone.querySelectorAll(".recipe-clist-ingredients")[0].innerHTML = "";
                  v.ingredients.forEach((vv,ii) => {
                        var cloneIng = document.importNode(templateIng.content, true);
                        cloneIng.querySelectorAll(".recipe-clist-ingredient-id")[0].value = vv.id;
                        cloneIng.querySelectorAll(".recipe-clist-ingredient-id")[0].onchange = function() {c_edit_recipe_ingredient(i,ii,"id",this.value);};
                        cloneIng.querySelectorAll(".recipe-clist-ingredient-amount")[0].value = vv.amount;
                        cloneIng.querySelectorAll(".recipe-clist-ingredient-amount")[0].onchange = function() {c_edit_recipe_ingredient(i,ii,"amount",this.value);};
                        cloneIng.querySelectorAll(".recipe-clist-ingredient-remove")[0].onclick = function() {c_remove_recipe_ingredient(i,ii);};
                        clone.querySelectorAll(".recipe-clist-ingredients")[0].appendChild(cloneIng);
                  });
                  clone.querySelectorAll(".recipe-clist-ingredients-add")[0].onclick = function() {c_new_recipe_ingredient(i);};
                  clone.querySelectorAll(".recipe-clist-linked")[0].innerHTML = "";
                  v.linkeditems.forEach((vv,ii) => {
                        var cloneLnk = document.importNode(templateLnk.content, true);
                        cloneLnk.querySelectorAll(".recipe-clist-linked-id")[0].value = vv;
                        cloneLnk.querySelectorAll(".recipe-clist-linked-id")[0].onchange = function() {c_edit_recipe_linked(i,ii,this.value);};
                        cloneLnk.querySelectorAll(".recipe-clist-linked-remove")[0].onclick = function() {c_remove_recipe_linked(i,ii);};
                        clone.querySelectorAll(".recipe-clist-linked")[0].appendChild(cloneLnk);
                  });
                  clone.querySelectorAll(".recipe-clist-linked-add")[0].onclick = function() {c_new_recipe_linked(i);};
                  clone.querySelectorAll(".recipe-clist-unlock")[0].innerHTML = "";
                  v.unlocks.forEach((vv,ii) => {
                        var cloneUnl = document.importNode(templateUnl.content, true);
                        cloneUnl.querySelectorAll(".recipe-clist-unlock-id")[0].value = vv;
                        cloneUnl.querySelectorAll(".recipe-clist-unlock-id")[0].onchange = function() {c_edit_recipe_unlock(i,ii,this.value);};
                        cloneUnl.querySelectorAll(".recipe-clist-unlock-remove")[0].onclick = function() {c_remove_recipe_unlock(i,ii);};
                        clone.querySelectorAll(".recipe-clist-unlock")[0].appendChild(cloneUnl);
                  });
                  clone.querySelectorAll(".recipe-clist-unlock-add")[0].onclick = function() {c_new_recipe_unlock(i);};
                  document.getElementById("editor-recipe-citems-list").appendChild(clone);
            });
      } else if (outputMode === 3) {
            _aliasRecipes.forEach((v,i) => {
                  var clone = document.importNode(template.content, true);
                  clone.querySelectorAll(".recipe-clist-id")[0].value = v.id;
                  clone.querySelectorAll(".recipe-clist-id")[0].onchange = function() {c_edit_recipe(i,"id",this.value);};
                  clone.querySelectorAll(".recipe-clist-amount")[0].value = v.amount;
                  clone.querySelectorAll(".recipe-clist-amount")[0].onchange = function() {c_edit_recipe(i,"amount",this.value);};
                  clone.querySelectorAll(".recipe-clist-displayname")[0].value = v.displayname;
                  clone.querySelectorAll(".recipe-clist-displayname")[0].onchange = function() {c_edit_recipe(i,"displayname",this.value);};
                  clone.querySelectorAll(".recipe-clist-tooltip")[0].value = v.tooltip;
                  clone.querySelectorAll(".recipe-clist-tooltip")[0].onchange = function() {c_edit_recipe(i,"tooltip",this.value);};
                  clone.querySelectorAll(".recipe-clist-path")[0].value = v.path;
                  clone.querySelectorAll(".recipe-clist-path")[0].onchange = function() {c_edit_recipe(i,"path",this.value);};
                  clone.querySelectorAll(".recipe-clist-pdagroup")[0].value = v.pdagroup;
                  clone.querySelectorAll(".recipe-clist-pdagroup")[0].onchange = function() {c_edit_recipe(i,"pdagroup",this.value);};
                  clone.querySelectorAll(".recipe-clist-pdacategory")[0].value = v.pdacategory;
                  clone.querySelectorAll(".recipe-clist-pdacategory")[0].onchange = function() {c_edit_recipe(i,"pdacategory",this.value);};
                  clone.querySelectorAll(".recipe-clist-functionalid")[0].value = v.functionalid;
                  clone.querySelectorAll(".recipe-clist-functionalid")[0].onchange = function() {c_edit_recipe(i,"functionalid",this.value);};
                  clone.querySelectorAll(".recipe-clist-forceunlock-default")[0].checked = v.forceunlockdefault ? "checked" : "";
                  clone.querySelectorAll(".recipe-clist-forceunlock-default")[0].onchange = function() {c_edit_recipe(i,"forceunlockdef",this.checked);};
                  clone.querySelectorAll(".recipe-clist-forceunlock")[0].checked = v.forceunlock ? "checked" : "";
                  clone.querySelectorAll(".recipe-clist-forceunlock")[0].onchange = function() {c_edit_recipe(i,"forceunlock",this.checked);};
                  clone.querySelectorAll(".recipe-clist-remove")[0].onclick = function() {c_remove_recipe(i);};
                  clone.querySelectorAll(".recipe-clist-ingredients")[0].innerHTML = "";
                  v.ingredients.forEach((vv,ii) => {
                        var cloneIng = document.importNode(templateIng.content, true);
                        cloneIng.querySelectorAll(".recipe-clist-ingredient-id")[0].value = vv.id;
                        cloneIng.querySelectorAll(".recipe-clist-ingredient-id")[0].onchange = function() {c_edit_recipe_ingredient(i,ii,"id",this.value);};
                        cloneIng.querySelectorAll(".recipe-clist-ingredient-amount")[0].value = vv.amount;
                        cloneIng.querySelectorAll(".recipe-clist-ingredient-amount")[0].onchange = function() {c_edit_recipe_ingredient(i,ii,"amount",this.value);};
                        cloneIng.querySelectorAll(".recipe-clist-ingredient-remove")[0].onclick = function() {c_remove_recipe_ingredient(i,ii);};
                        clone.querySelectorAll(".recipe-clist-ingredients")[0].appendChild(cloneIng);
                  });
                  clone.querySelectorAll(".recipe-clist-ingredients-add")[0].onclick = function() {c_new_recipe_ingredient(i);};
                  clone.querySelectorAll(".recipe-clist-linked")[0].innerHTML = "";
                  v.linkeditems.forEach((vv,ii) => {
                        var cloneLnk = document.importNode(templateLnk.content, true);
                        cloneLnk.querySelectorAll(".recipe-clist-linked-id")[0].value = vv;
                        cloneLnk.querySelectorAll(".recipe-clist-linked-id")[0].onchange = function() {c_edit_recipe_linked(i,ii,this.value);};
                        cloneLnk.querySelectorAll(".recipe-clist-linked-remove")[0].onclick = function() {c_remove_recipe_linked(i,ii);};
                        clone.querySelectorAll(".recipe-clist-linked")[0].appendChild(cloneLnk);
                  });
                  clone.querySelectorAll(".recipe-clist-linked-add")[0].onclick = function() {c_new_recipe_linked(i);};
                  clone.querySelectorAll(".recipe-clist-unlock")[0].innerHTML = "";
                  v.unlocks.forEach((vv,ii) => {
                        var cloneUnl = document.importNode(templateUnl.content, true);
                        cloneUnl.querySelectorAll(".recipe-clist-unlock-id")[0].value = vv;
                        cloneUnl.querySelectorAll(".recipe-clist-unlock-id")[0].onchange = function() {c_edit_recipe_unlock(i,ii,this.value);};
                        cloneUnl.querySelectorAll(".recipe-clist-unlock-remove")[0].onclick = function() {c_remove_recipe_unlock(i,ii);};
                        clone.querySelectorAll(".recipe-clist-unlock")[0].appendChild(cloneUnl);
                  });
                  clone.querySelectorAll(".recipe-clist-unlock-add")[0].onclick = function() {c_new_recipe_unlock(i);};
                  document.getElementById("editor-recipe-citems-list").appendChild(clone);
            });
      }
}

function c_new_recipe_ingredient(index) {
      var _ingr = new Ingredient("",0);
      if (outputMode === 1) {
            if (index >= 0 && _addedRecipes.length > index) {
                  _addedRecipes[index].ingredients.push(_ingr);
            }
      } else if (outputMode === 2) {
            if (index >= 0 && _modifiedRecipes.length > index) {
                  _modifiedRecipes[index].ingredients.push(_ingr);
            }
      } else if (outputMode === 3) {
            if (index >= 0 && _aliasRecipes.length > index) {
                  _aliasRecipes[index].ingredients.push(_ingr);
            }
      }
      outputData();
}

function c_new_recipe_linked(index) {
      if (outputMode === 1) {
            if (index >= 0 && _addedRecipes.length > index) {
                  _addedRecipes[index].linkeditems.push("");
            }
      } else if (outputMode === 2) {
            if (index >= 0 && _modifiedRecipes.length > index) {
                  _modifiedRecipes[index].linkeditems.push("");
            }
      } else if (outputMode === 3) {
            if (index >= 0 && _aliasRecipes.length > index) {
                  _aliasRecipes[index].linkeditems.push("");
            }
      }
      outputData();
}

function c_new_recipe_unlock(index) {
      if (outputMode === 1) {
            if (index >= 0 && _addedRecipes.length > index) {
                  _addedRecipes[index].unlocks.push("");
            }
      } else if (outputMode === 2) {
            if (index >= 0 && _modifiedRecipes.length > index) {
                  _modifiedRecipes[index].unlocks.push("");
            }
      } else if (outputMode === 3) {
            if (index >= 0 && _aliasRecipes.length > index) {
                  _aliasRecipes[index].unlocks.push("");
            }
      }
      outputData();
}

function c_edit_recipe(index,field,newvalue) {
      if (outputMode === 1) {
            if (index >= 0 && _addedRecipes.length > index) {
                  if (field === "id") {
                        _addedRecipes[index].id = newvalue;
                  } else if (field === "amount") {
                        _addedRecipes[index].amount = newvalue;
                  } else if (field === "displayname") {
                        _addedRecipes[index].displayname = newvalue;
                  } else if (field === "tooltip") {
                        _addedRecipes[index].tooltip = newvalue;
                  } else if (field === "path") {
                        _addedRecipes[index].path = newvalue;
                  } else if (field === "pdagroup") {
                        _addedRecipes[index].pdagroup = newvalue;
                  } else if (field === "pdacategory") {
                        _addedRecipes[index].pdacategory = newvalue;
                  } else if (field === "functionalid") {
                        _addedRecipes[index].t_functionalid = newvalue;
                  } else if (field === "forceunlockdef") {
                        if (newvalue === true || newvalue === false) {
                              _addedRecipes[index].forceunlockdefault = newvalue;
                        } else {
                              _addedRecipes[index].forceunlockdefault = newvalue === "checked" ? true : false;
                        }
                  } else if (field === "forceunlock") {
                        if (newvalue === true || newvalue === false) {
                              _addedRecipes[index].forceunlock = newvalue;
                        } else {
                              _addedRecipes[index].forceunlock = newvalue === "checked" ? true : false;
                        }
                  }
            }
      } else if (outputMode === 2) {
            if (index >= 0 && _modifiedRecipes.length > index) {
                  if (field === "id") {
                        _modifiedRecipes[index].id = newvalue;
                  } else if (field === "amount") {
                        _modifiedRecipes[index].amount = newvalue;
                  } else if (field === "displayname") {
                        _modifiedRecipes[index].displayname = newvalue;
                  } else if (field === "tooltip") {
                        _modifiedRecipes[index].tooltip = newvalue;
                  } else if (field === "path") {
                        _modifiedRecipes[index].path = newvalue;
                  } else if (field === "pdagroup") {
                        _modifiedRecipes[index].pdagroup = newvalue;
                  } else if (field === "pdacategory") {
                        _modifiedRecipes[index].pdacategory = newvalue;
                  } else if (field === "functionalid") {
                        _modifiedRecipes[index].t_functionalid = newvalue;
                  } else if (field === "forceunlockdef") {
                        if (newvalue === true || newvalue === false) {
                              _modifiedRecipes[index].forceunlockdefault = newvalue;
                        } else {
                              _modifiedRecipes[index].forceunlockdefault = newvalue === "checked" ? true : false;
                        }
                  } else if (field === "forceunlock") {
                        if (newvalue === true || newvalue === false) {
                              _modifiedRecipes[index].forceunlock = newvalue;
                        } else {
                              _modifiedRecipes[index].forceunlock = newvalue === "checked" ? true : false;
                        }
                  }
            }
      } else if (outputMode === 3) {
            if (index >= 0 && _aliasRecipes.length > index) {
                  if (field === "id") {
                        _aliasRecipes[index].id = newvalue;
                  } else if (field === "amount") {
                        _aliasRecipes[index].amount = newvalue;
                  } else if (field === "displayname") {
                        _aliasRecipes[index].displayname = newvalue;
                  } else if (field === "tooltip") {
                        _aliasRecipes[index].tooltip = newvalue;
                  } else if (field === "path") {
                        _aliasRecipes[index].path = newvalue;
                  } else if (field === "pdagroup") {
                        _aliasRecipes[index].pdagroup = newvalue;
                  } else if (field === "pdacategory") {
                        _aliasRecipes[index].pdacategory = newvalue;
                  } else if (field === "functionalid") {
                        _aliasRecipes[index].functionalid = newvalue;
                  } else if (field === "forceunlockdef") {
                        if (newvalue === true || newvalue === false) {
                              _aliasRecipes[index].forceunlockdefault = newvalue;
                        } else {
                              _aliasRecipes[index].forceunlockdefault = newvalue === "checked" ? true : false;
                        }
                  } else if (field === "forceunlock") {
                        if (newvalue === true || newvalue === false) {
                              _aliasRecipes[index].forceunlock = newvalue;
                        } else {
                              _aliasRecipes[index].forceunlock = newvalue === "checked" ? true : false;
                        }
                  }
            }
      }
      outputData();
}

function c_edit_recipe_ingredient(index,iindex,field,newvalue) {
      if (outputMode === 1) {
            if (index >= 0 && _addedRecipes.length > index) {
                  if (iindex >= 0 && _addedRecipes[index].ingredients.length > iindex) {
                        if (field === "id") {
                              _addedRecipes[index].ingredients[iindex].id = newvalue;
                        } else if (field === "amount") {
                              _addedRecipes[index].ingredients[iindex].amount = newvalue;
                        }
                  }
            }
      } else if (outputMode === 2) {
            if (index >= 0 && _modifiedRecipes.length > index) {
                  if (iindex >= 0 && _modifiedRecipes[index].ingredients.length > iindex) {
                        if (field === "id") {
                              _modifiedRecipes[index].ingredients[iindex].id = newvalue;
                        } else if (field === "amount") {
                              _modifiedRecipes[index].ingredients[iindex].amount = newvalue;
                        }
                  }
            }
      } else if (outputMode === 3) {
            if (index >= 0 && _aliasRecipes.length > index) {
                  if (iindex >= 0 && _aliasRecipes[index].ingredients.length > iindex) {
                        if (field === "id") {
                              _aliasRecipes[index].ingredients[iindex].id = newvalue;
                        } else if (field === "amount") {
                              _aliasRecipes[index].ingredients[iindex].amount = newvalue;
                        }
                  }
            }
      }
      outputData();
}

function c_edit_recipe_linked(index,iindex,newvalue) {
      if (outputMode === 1) {
            if (index >= 0 && _addedRecipes.length > index) {
                  if (iindex >= 0 && _addedRecipes[index].linkeditems.length > iindex) {
                        _addedRecipes[index].linkeditems[iindex] = newvalue;
                  }
            }
      } else if (outputMode === 2) {
            if (index >= 0 && _modifiedRecipes.length > index) {
                  if (iindex >= 0 && _modifiedRecipes[index].linkeditems.length > iindex) {
                        _modifiedRecipes[index].linkeditems[iindex] = newvalue;
                  }
            }
      } else if (outputMode === 3) {
            if (index >= 0 && _aliasRecipes.length > index) {
                  if (iindex >= 0 && _aliasRecipes[index].linkeditems.length > iindex) {
                        _aliasRecipes[index].linkeditems[iindex] = newvalue;
                  }
            }
      }
      outputData();
}

function c_edit_recipe_unlock(index,iindex,newvalue) {
      if (outputMode === 1) {
            if (index >= 0 && _addedRecipes.length > index) {
                  if (iindex >= 0 && _addedRecipes[index].unlocks.length > iindex) {
                        _addedRecipes[index].unlocks[iindex] = newvalue;
                  }
            }
      } else if (outputMode === 2) {
            if (index >= 0 && _modifiedRecipes.length > index) {
                  if (iindex >= 0 && _modifiedRecipes[index].unlocks.length > iindex) {
                        _modifiedRecipes[index].unlocks[iindex] = newvalue;
                  }
            }
      } else if (outputMode === 3) {
            if (index >= 0 && _aliasRecipes.length > index) {
                  if (iindex >= 0 && _aliasRecipes[index].unlocks.length > iindex) {
                        _aliasRecipes[index].unlocks[iindex] = newvalue;
                  }
            }
      }
      outputData();
}

function c_remove_recipe(index) {
      if (outputMode === 1) {
            if (index >= 0 && _addedRecipes.length > index) {
                  _addedRecipes.splice(index,1);
            }
      } else if (outputMode === 2) {
            if (index >= 0 && _modifiedRecipes.length > index) {
                  _modifiedRecipes.splice(index,1);
            }
      } else if (outputMode === 3) {
            if (index >= 0 && _aliasRecipes.length > index) {
                  _aliasRecipes.splice(index,1);
            }
      }
      outputData();
}

function c_remove_recipe_ingredient(index,iindex) {
      if (outputMode === 1) {
            if (index >= 0 && _addedRecipes.length > index) {
                  if (iindex >= 0 && _addedRecipes[index].ingredients.length > iindex) {
                        _addedRecipes[index].ingredients.splice(iindex,1);
                  }
            }
      } else if (outputMode === 2) {
            if (index >= 0 && _modifiedRecipes.length > index) {
                  if (iindex >= 0 && _modifiedRecipes[index].ingredients.length > iindex) {
                        _modifiedRecipes[index].ingredients.splice(iindex,1);
                  }
            }
      } else if (outputMode === 3) {
            if (index >= 0 && _aliasRecipes.length > index) {
                  if (iindex >= 0 && _aliasRecipes[index].ingredients.length > iindex) {
                        _aliasRecipes[index].ingredients.splice(iindex,1);
                  }
            }
      }
      outputData();
}

function c_remove_recipe_linked(index,iindex) {
      if (outputMode === 1) {
            if (index >= 0 && _addedRecipes.length > index) {
                  if (iindex >= 0 && _addedRecipes[index].linkeditems.length > iindex) {
                        _addedRecipes[index].linkeditems.splice(iindex,1);
                  }
            }
      } else if (outputMode === 2) {
            if (index >= 0 && _modifiedRecipes.length > index) {
                  if (iindex >= 0 && _modifiedRecipes[index].linkeditems.length > iindex) {
                        _modifiedRecipes[index].linkeditems.splice(iindex,1);
                  }
            }
      } else if (outputMode === 3) {
            if (index >= 0 && _aliasRecipes.length > index) {
                  if (iindex >= 0 && _aliasRecipes[index].linkeditems.length > iindex) {
                        _aliasRecipes[index].linkeditems.splice(iindex,1);
                  }
            }
      }
      outputData();
}

function c_remove_recipe_unlock(index,iindex) {
      if (outputMode === 1) {
            if (index >= 0 && _addedRecipes.length > index) {
                  if (iindex >= 0 && _addedRecipes[index].unlocks.length > iindex) {
                        _addedRecipes[index].unlocks.splice(iindex,1);
                  }
            }
      } else if (outputMode === 2) {
            if (index >= 0 && _modifiedRecipes.length > index) {
                  if (iindex >= 0 && _modifiedRecipes[index].unlocks.length > iindex) {
                        _modifiedRecipes[index].unlocks.splice(iindex,1);
                  }
            }
      } else if (outputMode === 3) {
            if (index >= 0 && _aliasRecipes.length > index) {
                  if (iindex >= 0 && _aliasRecipes[index].unlocks.length > iindex) {
                        _aliasRecipes[index].unlocks.splice(iindex,1);
                  }
            }
      }
      outputData();
}

function c_update_customtabList() {
      document.getElementById("editor-customtab-citems-list").innerHTML = "";
      var template = document.getElementById("customtab-clist-template");
      _customCraftingTabs.forEach((v,i) => {
            var clone = document.importNode(template.content, true);
            clone.querySelectorAll(".customtab-clist-id")[0].value = v.id;
            clone.querySelectorAll(".customtab-clist-id")[0].onchange = function() {c_edit_customtab(i,"id",this.value);};
            clone.querySelectorAll(".customtab-clist-displayname")[0].value = v.displayname;
            clone.querySelectorAll(".customtab-clist-displayname")[0].onchange = function() {c_edit_customtab(i,"displayname",this.value);};
            clone.querySelectorAll(".customtab-clist-sprite")[0].value = v.spriteitemid;
            clone.querySelectorAll(".customtab-clist-sprite")[0].onchange = function() {c_edit_customtab(i,"sprite",this.value);};
            clone.querySelectorAll(".customtab-clist-parentpath")[0].value = v.parenttabpath;
            clone.querySelectorAll(".customtab-clist-parentpath")[0].onchange = function() {c_edit_customtab(i,"parentpath",this.value);};
            clone.querySelectorAll(".customtab-clist-remove")[0].onclick = function() {c_remove_customtab(i);};
            document.getElementById("editor-customtab-citems-list").appendChild(clone);
      });
}

function c_edit_customtab(index,field,newvalue) {
      if (index >= 0 && _customCraftingTabs.length > index) {
            if (field === "id") {
                  _customCraftingTabs[index].id = newvalue;
            } else if (field === "displayname") {
                  _customCraftingTabs[index].displayname = newvalue;
            } else if (field === "sprite") {
                  _customCraftingTabs[index].spriteitemid = newvalue;
            } else if (field === "parentpath") {
                  _customCraftingTabs[index].parenttabpath = newvalue;
            }
      }
      outputData();
}

function c_remove_customtab(index) {
      if (index >= 0 && _customCraftingTabs.length > index) {
            _customCraftingTabs.splice(index, 1);
      }
      outputData();
}

function new_customsize() {
      var t_id = document.getElementById("editor-customsize-add-id").value;
      var t_width = document.getElementById("editor-customsize-add-width").value;
      var t_height = document.getElementById("editor-customsize-add-height").value;
      var _size = new CustomSize(t_id,t_width,t_height);
      _customItemSizes.push(_size);
      document.getElementById("editor-customsize-add-id").value = "";
      document.getElementById("editor-customsize-add-width").value = 1;
      document.getElementById("editor-customsize-add-height").value = 1;
      outputData();
}

function c_update_customsizeList() {
      document.getElementById("editor-customsize-citems-list").innerHTML = "";
      var template = document.getElementById("customsize-clist-template");
      _customItemSizes.forEach((v,i) => {
            var clone = document.importNode(template.content, true);
            clone.querySelectorAll(".customsize-clist-id")[0].value = v.id;
            clone.querySelectorAll(".customsize-clist-id")[0].onchange = function() {c_edit_customsize(i,"id",this.value);};
            clone.querySelectorAll(".customsize-clist-width")[0].value = v.width;
            clone.querySelectorAll(".customsize-clist-width")[0].onchange = function() {c_edit_customsize(i,"width",this.value);};
            clone.querySelectorAll(".customsize-clist-height")[0].value = v.height;
            clone.querySelectorAll(".customsize-clist-height")[0].onchange = function() {c_edit_customsize(i,"height",this.value);};
            clone.querySelectorAll(".customsize-clist-remove")[0].onclick = function() {c_remove_customsize(i);};
            document.getElementById("editor-customsize-citems-list").appendChild(clone);
      });
}

function c_edit_customsize(index,field,newvalue) {
      if (index >= 0 && _customItemSizes.length > index) {
            if (field === "id") {
                  _customItemSizes[index].id = newvalue;
            } else if (field === "width") {
                  _customItemSizes[index].width = newvalue;
            } else if (field === "height") {
                  _customItemSizes[index].height = newvalue;
            }
      }
      outputData();
}

function c_remove_customsize(index) {
      if (index >= 0 && _customItemSizes.length > index) {
            _customItemSizes.splice(index, 1);
      }
      outputData();
}



function new_custombiofuel() {
      var t_id = document.getElementById("editor-custombiofuels-add-id").value;
      var t_fuel = document.getElementById("editor-custombiofuels-add-fuel").value;
      var _fuel = new CustomBioFuel(t_id,t_fuel);
      _customBioFuels.push(_fuel);
      document.getElementById("editor-custombiofuels-add-id").value = "";
      document.getElementById("editor-custombiofuels-add-fuel").value = 0;
      outputData();
}

function c_update_custombiofuelList() {
      document.getElementById("editor-custombiofuels-citems-list").innerHTML = "";
      var template = document.getElementById("custombiofuels-clist-template");
      _customBioFuels.forEach((v,i) => {
            var clone = document.importNode(template.content, true);
            clone.querySelectorAll(".custombiofuels-clist-id")[0].value = v.id;
            clone.querySelectorAll(".custombiofuels-clist-id")[0].onchange = function() {c_edit_custombiofuel(i,"id",this.value);};
            clone.querySelectorAll(".custombiofuels-clist-fuel")[0].value = v.fuel;
            clone.querySelectorAll(".custombiofuels-clist-fuel")[0].onchange = function() {c_edit_custombiofuel(i,"fuel",this.value);};
            clone.querySelectorAll(".custombiofuels-clist-remove")[0].onclick = function() {c_remove_custombiofuel(i);};
            document.getElementById("editor-custombiofuels-citems-list").appendChild(clone);
      });
}

function c_edit_custombiofuel(index,field,newvalue) {
      if (index >= 0 && _customBioFuels.length > index) {
            if (field === "id") {
                  _customBioFuels[index].id = newvalue;
            } else if (field === "fuel") {
                  _customBioFuels[index].fuel = newvalue;
            }
      }
      outputData();
}

function c_remove_custombiofuel(index) {
      if (index >= 0 && _customBioFuels.length > index) {
            _customBioFuels.splice(index, 1);
      }
      outputData();
}




function new_customfragmentcount() {
      var t_id = document.getElementById("editor-customfragmentcounts-add-id").value;
      var t_amount = document.getElementById("editor-customfragmentcounts-add-amount").value;
      var _frag = new CustomFragmentCount(t_id,t_amount);
      _customFragmentCounts.push(_frag);
      document.getElementById("editor-customfragmentcounts-add-id").value = "";
      document.getElementById("editor-customfragmentcounts-add-amount").value = 1;
      outputData();
}

function c_update_customfragmentcountList() {
      document.getElementById("editor-customfragmentcounts-citems-list").innerHTML = "";
      var template = document.getElementById("customfragmentcounts-clist-template");
      _customFragmentCounts.forEach((v,i) => {
            var clone = document.importNode(template.content, true);
            clone.querySelectorAll(".customfragmentcounts-clist-id")[0].value = v.id;
            clone.querySelectorAll(".customfragmentcounts-clist-id")[0].onchange = function() {c_edit_customfragmentcount(i,"id",this.value);};
            clone.querySelectorAll(".customfragmentcounts-clist-amount")[0].value = v.amount;
            clone.querySelectorAll(".customfragmentcounts-clist-amount")[0].onchange = function() {c_edit_customfragmentcount(i,"amount",this.value);};
            clone.querySelectorAll(".customfragmentcounts-clist-remove")[0].onclick = function() {c_remove_customfragmentcount(i);};
            document.getElementById("editor-customfragmentcounts-citems-list").appendChild(clone);
      });
}

function c_edit_customfragmentcount(index,field,newvalue) {
      if (index >= 0 && _customFragmentCounts.length > index) {
            if (field === "id") {
                  _customFragmentCounts[index].id = newvalue;
            } else if (field === "amount") {
                  _customFragmentCounts[index].amount = newvalue;
            }
      }
      outputData();
}

function c_remove_customfragmentcount(index) {
      if (index >= 0 && _customFragmentCounts.length > index) {
            _customFragmentCounts.splice(index, 1);
      }
      outputData();
}




function new_movedrecipe() {
      var t_id = document.getElementById("editor-movedrecipes-add-id").value;
      var t_opath = document.getElementById("editor-movedrecipes-add-opath").value;
      var t_npath = document.getElementById("editor-movedrecipes-add-npath").value;
      var t_hiddendefault = document.getElementById("editor-movedrecipes-add-hiddendefault").checked;
      var t_hidden = document.getElementById("editor-movedrecipes-add-hidden").checked;
      var _mov = new MovedRecipe(t_id,t_opath,t_npath,t_hiddendefault,t_hidden);
      _movedRecipes.push(_mov);
      document.getElementById("editor-movedrecipes-add-id").value = "";
      document.getElementById("editor-movedrecipes-add-opath").value = "";
      document.getElementById("editor-movedrecipes-add-npath").value = "";
      document.getElementById("editor-movedrecipes-add-hiddendefault").checked = true;
      document.getElementById("editor-movedrecipes-add-hidden").checked = false;
      outputData();
}

function c_update_movedrecipeList() {
      document.getElementById("editor-movedrecipes-citems-list").innerHTML = "";
      var template = document.getElementById("movedrecipes-clist-template");
      _movedRecipes.forEach((v,i) => {
            var clone = document.importNode(template.content, true);
            clone.querySelectorAll(".movedrecipes-clist-id")[0].value = v.id;
            clone.querySelectorAll(".movedrecipes-clist-id")[0].onchange = function() {c_edit_movedrecipe(i,"id",this.value);};
            clone.querySelectorAll(".movedrecipes-clist-opath")[0].value = v.opath;
            clone.querySelectorAll(".movedrecipes-clist-opath")[0].onchange = function() {c_edit_movedrecipe(i,"opath",this.value);};
            clone.querySelectorAll(".movedrecipes-clist-npath")[0].value = v.npath;
            clone.querySelectorAll(".movedrecipes-clist-npath")[0].onchange = function() {c_edit_movedrecipe(i,"npath",this.value);};
            clone.querySelectorAll(".movedrecipes-clist-hidden-default")[0].checked = v.hiddendefault;
            clone.querySelectorAll(".movedrecipes-clist-hidden-default")[0].onchange = function() {c_edit_movedrecipe(i,"hiddendef",this.checked);};
            clone.querySelectorAll(".movedrecipes-clist-hidden")[0].checked = v.hidden;
            clone.querySelectorAll(".movedrecipes-clist-hidden")[0].onchange = function() {c_edit_movedrecipe(i,"hidden",this.checked);};
            clone.querySelectorAll(".movedrecipes-clist-remove")[0].onclick = function() {c_remove_movedrecipe(i);};
            document.getElementById("editor-movedrecipes-citems-list").appendChild(clone);
      });
}

function c_edit_movedrecipe(index,field,newvalue) {
      if (index >= 0 && _movedRecipes.length > index) {
            if (field === "id") {
                  _movedRecipes[index].id = newvalue;
            } else if (field === "opath") {
                  _movedRecipes[index].opath = newvalue;
            } else if (field === "npath") {
                  _movedRecipes[index].npath = newvalue;
            } else if (field === "hiddendef") {
                  if (newvalue === true || newvalue === false) {
                        _movedRecipes[index].hiddendefault = newvalue;
                  } else {
                        _movedRecipes[index].hiddendefault = newvalue === "checked" ? true : false;
                  }
            } else if (field === "hidden") {
                  if (newvalue === true || newvalue === false) {
                        _movedRecipes[index].hidden = newvalue;
                  } else {
                        _movedRecipes[index].hidden = newvalue === "checked" ? true : false;
                  }
            }
      }
      outputData();
}

function c_remove_movedrecipe(index) {
      if (index >= 0 && _movedRecipes.length > index) {
            _movedRecipes.splice(index, 1);
      }
      outputData();
}



function new_ingredient() {
      var t_id = document.getElementById("editor-recipe-add-ingredient-id").value;
      var t_amount = document.getElementById("editor-recipe-add-ingredient-amount").value;
      var _ingredient = new Ingredient(t_id,t_amount);
      temp_Ingredients.push(_ingredient);
      document.getElementById("editor-recipe-add-ingredient-id").value = "";
      document.getElementById("editor-recipe-add-ingredient-amount").value = 1;
      update_ingredientList();
}

function update_ingredientList() {
      document.getElementById("editor-recipe-ingredient-list").innerHTML = "";
      var template = document.getElementById("ingredient-list-template");
      temp_Ingredients.forEach((v,i) => {
            var clone = document.importNode(template.content, true);
            clone.querySelectorAll(".ingredient-list-id")[0].value = v.id;
            clone.querySelectorAll(".ingredient-list-id")[0].onchange = function() {edit_ingredient(i,"id",this.value);};
            clone.querySelectorAll(".ingredient-list-amount")[0].value = v.amount;
            clone.querySelectorAll(".ingredient-list-amount")[0].onchange = function() {edit_ingredient(i,"amount",this.value);};
            clone.querySelectorAll(".ingredient-list-remove")[0].onclick = function() {remove_ingredient(i);};
            document.getElementById("editor-recipe-ingredient-list").appendChild(clone);
      });
}

function edit_ingredient(index,field,newvalue) {
      if (index >= 0 && temp_Ingredients.length > index) {
            if (field === "id") {
                  temp_Ingredients[index].id = newvalue;
            } else if (field === "amount") {
                  temp_Ingredients[index].amount = newvalue;
            }
      }
      update_ingredientList();
}

function remove_ingredient(index) {
      temp_Ingredients.splice(index,1);
      update_ingredientList();
}

function new_linked() {
      var t_id = document.getElementById("editor-recipe-add-linked-id").value;
      temp_Linked.push(t_id);
      document.getElementById("editor-recipe-add-linked-id").value = "";
      update_linkedList();
}

function update_linkedList() {
      document.getElementById("editor-recipe-linked-list").innerHTML = "";
      var template = document.getElementById("linked-list-template");
      temp_Linked.forEach((v,i) => {
            var clone = document.importNode(template.content, true);
            clone.querySelectorAll(".linked-list-id")[0].value = v;
            clone.querySelectorAll(".linked-list-id")[0].onchange = function() {edit_linked(i,"",this.value);};
            clone.querySelectorAll(".linked-list-remove")[0].onclick = function() {remove_linked(i);};
            document.getElementById("editor-recipe-linked-list").appendChild(clone);
      });
}

function edit_linked(index,field,newvalue) {
      if (index >= 0 && temp_Linked.length > index) {
            if (field === "") {
                  temp_Linked[index] = newvalue;
            }
      }
      update_linkedList();
}

function remove_linked(index) {
      temp_Linked.splice(index,1);
      update_linkedList();
}

function new_unlock() {
      var t_id = document.getElementById("editor-recipe-add-unlock-id").value;
      temp_Unlock.push(t_id);
      document.getElementById("editor-recipe-add-unlock-id").value = "";
      update_unlockList();
}

function update_unlockList() {
      document.getElementById("editor-recipe-unlock-list").innerHTML = "";
      var template = document.getElementById("unlock-list-template");
      temp_Unlock.forEach((v,i) => {
            var clone = document.importNode(template.content, true);
            clone.querySelectorAll(".unlock-list-id")[0].value = v;
            clone.querySelectorAll(".unlock-list-id")[0].onchange = function() {edit_unlock(i,"",this.value);};
            clone.querySelectorAll(".unlock-list-remove")[0].onclick = function() {remove_unlock(i);};
            document.getElementById("editor-recipe-unlock-list").appendChild(clone);
      });
}

function edit_unlock(index,field,newvalue) {
      if (index >= 0 && temp_Linked.length > index) {
            if (field === "") {
                  temp_Linked[index] = newvalue;
            }
      }
      update_unlockList();
}

function remove_unlock(index) {
      temp_Unlock.splice(index,1);
      update_unlockList();
}

function new_craftingtab() {
      var t_id = document.getElementById("editor-customtab-add-id").value;
      var t_displayname = document.getElementById("editor-customtab-add-display").value;
      var t_spriteitemid = document.getElementById("editor-customtab-add-spriteitemid").value;
      var t_parentpath = document.getElementById("editor-customtab-add-parentpath").value;
      var _tab = new CraftingTab(t_id,t_displayname,t_spriteitemid,t_parentpath);
      _customCraftingTabs.push(_tab);
      document.getElementById("editor-customtab-add-id").value = "";
      document.getElementById("editor-customtab-add-display").value = "";
      document.getElementById("editor-customtab-add-spriteitemid").value = "";
      document.getElementById("editor-customtab-add-parentpath").value = "";
      outputData();
}

function change_mode(m) {
      outputMode = m;
      var el = document.getElementById("output-mode");
      var el_recipes = document.getElementById("editor-recipe");
      var el_customtabs = document.getElementById("editor-customtab");
      var el_customsizes = document.getElementById("editor-customsize");
      var el_custombiofuels = document.getElementById("editor-custombiofuels");
      var el_customfragmentcounts = document.getElementById("editor-customfragmentcounts");
      var el_movedrecipes = document.getElementById("editor-movedrecipes");
      if (outputMode === 0) {
            el.innerHTML = "Output - Nothing selected";
            el_recipes.hidden = "hidden";
            el_customtabs.hidden = "hidden";
            el_customsizes.hidden = "hidden";
            el_custombiofuels.hidden = "hidden";
            el_customfragmentcounts.hidden = "hidden";
            el_movedrecipes.hidden = "hidden";
      } else if (outputMode === 1) {
            el.innerHTML = "Output - AddedRecipe";
            el_recipes.hidden = "";
            el_customtabs.hidden = "hidden";
            el_customsizes.hidden = "hidden";
            el_custombiofuels.hidden = "hidden";
            el_customfragmentcounts.hidden = "hidden";
            el_movedrecipes.hidden = "hidden";
      } else if (outputMode === 2) {
            el.innerHTML = "Output - ModifiedRecipe";
            el_recipes.hidden = "";
            el_customtabs.hidden = "hidden";
            el_customsizes.hidden = "hidden";
            el_custombiofuels.hidden = "hidden";
            el_customfragmentcounts.hidden = "hidden";
            el_movedrecipes.hidden = "hidden";
      } else if (outputMode === 3) {
            el.innerHTML = "Output - AliasRecipe";
            el_recipes.hidden = "";
            el_customtabs.hidden = "hidden";
            el_customsizes.hidden = "hidden";
            el_custombiofuels.hidden = "hidden";
            el_customfragmentcounts.hidden = "hidden";
            el_movedrecipes.hidden = "hidden";
      } else if (outputMode === 4) {
            el.innerHTML = "Output - CustomCraftingTab";
            el_recipes.hidden = "hidden";
            el_customtabs.hidden = "";
            el_customsizes.hidden = "hidden";
            el_custombiofuels.hidden = "hidden";
            el_customfragmentcounts.hidden = "hidden";
            el_movedrecipes.hidden = "hidden";
      } else if (outputMode === 5) {
            el.innerHTML = "Output - CustomSizes";
            el_recipes.hidden = "hidden";
            el_customtabs.hidden = "hidden";
            el_customsizes.hidden = "";
            el_custombiofuels.hidden = "hidden";
            el_customfragmentcounts.hidden = "hidden";
            el_movedrecipes.hidden = "hidden";
      } else if (outputMode === 6) {
            el.innerHTML = "Output - CustomBioFuels";
            el_recipes.hidden = "hidden";
            el_customtabs.hidden = "hidden";
            el_customsizes.hidden = "hidden";
            el_custombiofuels.hidden = "";
            el_customfragmentcounts.hidden = "hidden";
            el_movedrecipes.hidden = "hidden";
      } else if (outputMode === 7) {
            el.innerHTML = "Output - CustomFragmentSizes";
            el_recipes.hidden = "hidden";
            el_customtabs.hidden = "hidden";
            el_customsizes.hidden = "hidden";
            el_custombiofuels.hidden = "hidden";
            el_customfragmentcounts.hidden = "";
            el_movedrecipes.hidden = "hidden";
      } else if (outputMode === 8) {
            el.innerHTML = "Output - MovedRecipes";
            el_recipes.hidden = "hidden";
            el_customtabs.hidden = "hidden";
            el_customsizes.hidden = "hidden";
            el_custombiofuels.hidden = "hidden";
            el_customfragmentcounts.hidden = "hidden";
            el_movedrecipes.hidden = "";
      }
      outputData();
}

function loadInput() {
      var elIn = document.getElementById("code-input");
      var stringIn = elIn.value;
      elIn.value = "";
      var parsed = parseString(stringIn);
      resetValues();
      if (parsed.mode === 1) {
            _addedRecipes = parsed.data;
            change_mode(1);
      } else if (parsed.mode === 2) {
            _modifiedRecipes = parsed.data;
            change_mode(2);
      } else if (parsed.mode === 3) {
            _aliasRecipes = parsed.data;
            change_mode(3);
      } else if (parsed.mode === 4) {
            _customCraftingTabs = parsed.data;
            change_mode(4);
      } else if (parsed.mode === 5) {
            _customItemSizes = parsed.data;
            change_mode(5);
      } else if (parsed.mode === 6) {
            _customBioFuels = parsed.data;
            change_mode(6);
      } else if (parsed.mode === 7) {
            _customFragmentCounts = parsed.data;
            change_mode(7);
      } else if (parsed.mode === 8) {
            _movedRecipes = parsed.data;
            change_mode(8);
      }
      change_input_visibility(false);
      outputData();
}

function resetValues() {
      _addedRecipes = [];
      _modifiedRecipes = [];
      _aliasRecipes = [];
      _customCraftingTabs = [];
      _customItemSizes = [];
      _customBioFuels = [];
      _customFragmentCounts = [];
      _movedRecipes = [];
      temp_Ingredients = [];
      temp_Linked = [];
      temp_Unlock = [];
      update_ingredientList();
      update_linkedList();
      update_unlockList();
      change_mode(0);
      update_input_visibility();
      update_change_visibility();
      outputData();
}

function toggle_input() {
      change_input_visibility(!showInput);
}

function change_input_visibility(visible) {
      showInput = visible;
      update_input_visibility();
}

function toggle_showChange() {
      change_change_visibility(!showChange);
}

function change_change_visibility(visible) {
      showChange = visible;
      update_change_visibility();
}

function update_input_visibility() {
      var el = document.getElementById("editor-input");
      if (showInput) {
            el.hidden = "";
      } else {
            el.hidden = "hidden";
      }
}

function update_change_visibility() {
      var elchange = document.getElementsByClassName("editor-change");
      var eladd = document.getElementsByClassName("editor-add");
      if (showChange) {
            for (var i = 0; i < elchange.length; ++i) {
                  elchange[i].hidden = "";
            }
            for (var i = 0; i < eladd.length; ++i) {
                  eladd[i].hidden = "hidden";
            }
      } else {
            for (var i = 0; i < elchange.length; ++i) {
                  elchange[i].hidden = "hidden";
            }
            for (var i = 0; i < eladd.length; ++i) {
                  eladd[i].hidden = "";
            }
      }
}

// VARS

var _addedRecipes = [];
var _modifiedRecipes = [];
var _aliasRecipes = [];
var _customCraftingTabs = [];
var _customItemSizes = [];
var _customBioFuels = [];
var _customFragmentCounts = [];
var _movedRecipes = [];

var temp_Ingredients = [];
var temp_Linked = [];
var temp_Unlock = [];

var outputMode = 0;
var showInput = false;
var showChange = false;