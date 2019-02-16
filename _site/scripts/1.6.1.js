function parseString(input) {
      var output = "";
      var input_array = input.split("");

      var canceled = false;
      var input_mode = 0; // 1 = Added : 2 = Modified : 3 = Alias
      var openBrackets = 0;

      var addedRecipes = [];
      var modifiedRecipes = [];
      var aliasRecipes = [];
      var customCraftingTabs = [];
      var customSizes = [];
      var customBioFuels = [];
      var customFragmentCount = [];
      var movedRecipes = [];

      var currentFieldCheck = "";
      var currentFieldGetValueNow = false;
      var currentFieldValue = "";
      var currentInnerField = "";
      var currentInnerFieldGetValueNow = false;
      var currentInnerFieldValue = "";
      var currentlineComment = false;
      var ignoreBrackets = false;

      var currentObject;
      var currentIngredient;

      input_array.forEach((c, i) => {
            if (!canceled) {
                  if (c != "#" && !currentlineComment) {
                        if (!(input_mode > 0)) {
                              if (c == " " || c == "\n") {

                              } else if (c == ":") {
                                    if (currentFieldCheck == "AddedRecipes") {
                                          currentFieldCheck = "";
                                          currentFieldGetValueNow = false;
                                          currentFieldValue = "";

                                          currentInnerField = "";
                                          currentInnerFieldGetValueNow = false;
                                          currentInnerFieldValue = "";
                                          input_mode = 1;
                                    } else if (currentFieldCheck == "ModifiedRecipes") {
                                          currentFieldCheck = "";
                                          currentFieldGetValueNow = false;
                                          currentFieldValue = "";

                                          currentInnerField = "";
                                          currentInnerFieldGetValueNow = false;
                                          currentInnerFieldValue = "";
                                          input_mode = 2;
                                    } else if (currentFieldCheck == "AliasRecipes") {
                                          currentFieldCheck = "";
                                          currentFieldGetValueNow = false;
                                          currentFieldValue = "";

                                          currentInnerField = "";
                                          currentInnerFieldGetValueNow = false;
                                          currentInnerFieldValue = "";
                                          input_mode = 3;
                                    } else if (currentFieldCheck == "CustomCraftingTabs") {
                                          currentFieldCheck = "";
                                          currentFieldGetValueNow = false;
                                          currentFieldValue = "";

                                          currentInnerField = "";
                                          currentInnerFieldGetValueNow = false;
                                          currentInnerFieldValue = "";
                                          input_mode = 4;
                                    } else if (currentFieldCheck == "CustomSizes") {
                                          currentFieldCheck = "";
                                          currentFieldGetValueNow = false;
                                          currentFieldValue = "";

                                          currentInnerField = "";
                                          currentInnerFieldGetValueNow = false;
                                          currentInnerFieldValue = "";
                                          input_mode = 5;
                                    } else if (currentFieldCheck == "CustomBioFuels") {
                                          currentFieldCheck = "";
                                          currentFieldGetValueNow = false;
                                          currentFieldValue = "";

                                          currentInnerField = "";
                                          currentInnerFieldGetValueNow = false;
                                          currentInnerFieldValue = "";
                                          input_mode = 6;
                                    } else if (currentFieldCheck == "CustomFragmentCounts") {
                                          currentFieldCheck = "";
                                          currentFieldGetValueNow = false;
                                          currentFieldValue = "";

                                          currentInnerField = "";
                                          currentInnerFieldGetValueNow = false;
                                          currentInnerFieldValue = "";
                                          input_mode = 7;
                                    } else if (currentFieldCheck == "MovedRecipes") {
                                          currentFieldCheck = "";
                                          currentFieldGetValueNow = false;
                                          currentFieldValue = "";

                                          currentInnerField = "";
                                          currentInnerFieldGetValueNow = false;
                                          currentInnerFieldValue = "";
                                          input_mode = 8;
                                    } else {
                                          currentFieldCheck = "";
                                          currentFieldGetValueNow = false;
                                          currentFieldValue = "";

                                          currentInnerField = "";
                                          currentInnerFieldGetValueNow = false;
                                          currentInnerFieldValue = "";
                                          canceled = true;
                                    }
                              } else {
                                    currentFieldCheck += c;
                              }
                        } else {
                              if (input_mode === 1 || input_mode === 2 || input_mode === 3) {
                                    if (openBrackets == 0) {
                                          if (c == " " || c == "\n") {

                                          } else if (c == "(") {
                                                currentObject = new Recipe("", 0, [], [], true, true, [], "", "", "","","","");
                                                openBrackets++;
                                          } else {

                                          }
                                    } else if (openBrackets == 1 || openBrackets == 2) {
                                          if (openBrackets == 1 && c == ")" && !ignoreBrackets) {
                                                openBrackets--;
                                                if (input_mode == 1) {
                                                      addedRecipes.push(currentObject);
                                                } else if (input_mode == 2) {
                                                      modifiedRecipes.push(currentObject);
                                                } else if (input_mode == 3) {
                                                      aliasRecipes.push(currentObject);
                                                }
                                                currentObject = null;
                                                currentFieldCheck = "";
                                                currentFieldGetValueNow = false;
                                                currentFieldValue = "";

                                                currentInnerField = "";
                                                currentInnerFieldGetValueNow = false;
                                                currentInnerFieldValue = "";
                                          } else {
                                                if (currentFieldCheck == "") {
                                                      if (c == " " || c == "\n" || c == ":" || c == ";") {
                                                            if (c == ":" || c == ";") {

                                                            }
                                                      } else {
                                                            currentFieldCheck += c;
                                                      }
                                                } else {
                                                      if (!currentFieldGetValueNow) {
                                                            if (c == " " || c == "\n") {
                                                                  currentFieldCheck = "";
                                                                  currentFieldGetValueNow = false;
                                                                  currentFieldValue = "";

                                                                  currentInnerField = "";
                                                                  currentInnerFieldGetValueNow = false;
                                                                  currentInnerFieldValue = "";
                                                            } else if (c == ";") {
                                                                  currentFieldCheck = "";
                                                                  currentFieldGetValueNow = false;
                                                                  currentFieldValue = "";

                                                                  currentInnerField = "";
                                                                  currentInnerFieldGetValueNow = false;
                                                                  currentInnerFieldValue = "";
                                                            } else if (c == ":") {
                                                                  if (currentFieldCheck == "ItemID" || currentFieldCheck == "DisplayName" || currentFieldCheck == "Tooltip" || currentFieldCheck == "AmountCrafted" || currentFieldCheck == "Ingredients" || currentFieldCheck == "LinkedItemIDs" || currentFieldCheck == "Unlocks" || currentFieldCheck == "Path" || currentFieldCheck == "ForceUnlockAtStart" || currentFieldCheck == "PdaGroup" || currentFieldCheck == "PdaCategory" || currentFieldCheck == "FunctionalID") {
                                                                        currentFieldGetValueNow = true;
                                                                  } else {
                                                                        currentFieldCheck = "";
                                                                        currentFieldGetValueNow = false;
                                                                        currentFieldValue = "";

                                                                        currentInnerField = "";
                                                                        currentInnerFieldGetValueNow = false;
                                                                        currentInnerFieldValue = "";
                                                                  }
                                                            } else {
                                                                  currentFieldCheck += c;
                                                            }
                                                      } else {
                                                            if (currentFieldValue === "") {
                                                                  if (c == " " || c == "\n" || c == ":" || c == ";") {
                                                                        if (c == ";") {
                                                                              currentFieldCheck = "";
                                                                              currentFieldGetValueNow = false;
                                                                              currentFieldValue = "";

                                                                              currentInnerField = "";
                                                                              currentInnerFieldGetValueNow = false;
                                                                              currentInnerFieldValue = "";
                                                                        }
                                                                  } else {
                                                                        if (currentFieldCheck == "Ingredients") {
                                                                              currentFieldValue = [];
                                                                              if (c == " " || c == "\n") {

                                                                              } else if (c == "(") {
                                                                                    openBrackets++;
                                                                                    currentIngredient = new Ingredient("", 0);
                                                                                    currentInnerField = "";
                                                                                    currentInnerFieldGetValueNow = false;
                                                                                    currentInnerFieldValue = "";
                                                                              } else if (c == ";") {
                                                                                    currentFieldCheck = "";
                                                                                    currentFieldGetValueNow = false;
                                                                                    currentFieldValue = "";
                                                                                    currentIngredient = null;
                                                                                    currentInnerField = "";
                                                                                    currentInnerFieldGetValueNow = false;
                                                                                    currentInnerFieldValue = "";
                                                                              } else {
                                                                                    currentFieldCheck = "";
                                                                                    currentFieldGetValueNow = false;
                                                                                    currentFieldValue = "";
                                                                                    currentIngredient = null;
                                                                                    currentInnerField = "";
                                                                                    currentInnerFieldGetValueNow = false;
                                                                                    currentInnerFieldValue = "";
                                                                              }
                                                                        } else if (currentFieldCheck == "LinkedItemIDs" || currentFieldCheck == "Unlocks") {
                                                                              currentFieldValue = [];
                                                                              if (c == "\"") {
                                                                                    currentFieldCheck = "";
                                                                                    currentFieldGetValueNow = false;
                                                                                    currentFieldValue = "";
                                                                                    currentIngredient = null;
                                                                                    currentInnerField = "";
                                                                                    currentInnerFieldGetValueNow = false;
                                                                                    currentInnerFieldValue = "";
                                                                              } else if (c == ",") {
                                                                                    if (currentInnerField == "") {

                                                                                    } else {
                                                                                          currentFieldValue.push(currentInnerField);
                                                                                          currentInnerField = "";
                                                                                    }
                                                                              } else {
                                                                                    currentInnerField += c;
                                                                              }
                                                                        } else if (currentFieldCheck == "DisplayName" || currentFieldCheck == "Tooltip") {
                                                                              currentFieldValue = "";
                                                                              ignoreBrackets = true;
                                                                              if (c == "\"") {

                                                                              } else {
                                                                                    currentFieldValue += c;
                                                                              }
                                                                        } else {
                                                                              currentFieldValue += c;
                                                                        }
                                                                  }
                                                            } else {
                                                                  if (currentFieldCheck == "Ingredients") {
                                                                        if (openBrackets == 2) {
                                                                              if (currentInnerField == "") {
                                                                                    if (c == ")" && !ignoreBrackets) {
                                                                                          currentFieldValue.push(currentIngredient);

                                                                                          currentIngredient = null;
                                                                                          currentInnerField = "";
                                                                                          currentInnerFieldGetValueNow = false;
                                                                                          currentInnerFieldValue = "";
                                                                                          openBrackets--;
                                                                                    } else if (c == " " || c == "\n") {

                                                                                    } else if (c == ";" || c == ":") {
                                                                                          currentInnerField = "";
                                                                                          currentInnerFieldGetValueNow = false;
                                                                                          currentInnerFieldValue = "";
                                                                                    } else {
                                                                                          currentInnerField += c;
                                                                                    }
                                                                              } else {
                                                                                    if (!currentInnerFieldGetValueNow) {
                                                                                          if (c == ")" && !ignoreBrackets) {
                                                                                                if (currentInnerField !== "" && currentInnerFieldValue !== "") {
                                                                                                      if (currentInnerField == "ItemID") {
                                                                                                            currentIngredient.id = currentInnerFieldValue;
                                                                                                      } else if (currentInnerField == "Required") {
                                                                                                            currentIngredient.amount = currentInnerFieldValue;
                                                                                                      }
                                                                                                }
                                                                                                currentFieldValue.push(currentIngredient);

                                                                                                currentIngredient = null;
                                                                                                currentInnerField = "";
                                                                                                currentInnerFieldGetValueNow = false;
                                                                                                currentInnerFieldValue = "";
                                                                                                openBrackets--;
                                                                                          } else if (c == " " || c == "\n") {
                                                                                                currentInnerField = "";
                                                                                                currentInnerFieldGetValueNow = false;
                                                                                                currentInnerFieldValue = "";
                                                                                          } else if (c == ";") {
                                                                                                currentInnerField = "";
                                                                                                currentInnerFieldGetValueNow = false;
                                                                                                currentInnerFieldValue = "";
                                                                                          } else if (c == ":") {
                                                                                                if (currentInnerField == "ItemID" || currentInnerField == "Required") {
                                                                                                      currentInnerFieldGetValueNow = true;
                                                                                                } else {

                                                                                                      currentInnerField = "";
                                                                                                      currentInnerFieldGetValueNow = false;
                                                                                                      currentInnerFieldValue = "";
                                                                                                }
                                                                                          } else {
                                                                                                currentInnerField += c;
                                                                                          }
                                                                                    } else {
                                                                                          if (currentInnerFieldValue === "") {
                                                                                                if (c == ")" && !ignoreBrackets) {
                                                                                                      currentFieldValue.push(currentIngredient);

                                                                                                      currentIngredient = null;
                                                                                                      currentInnerField = "";
                                                                                                      currentInnerFieldGetValueNow = false;
                                                                                                      currentInnerFieldValue = "";
                                                                                                      openBrackets--;
                                                                                                } else if (c == " ") {

                                                                                                } else if (c == "\n") {
                                                                                                      currentInnerField = "";
                                                                                                      currentInnerFieldGetValueNow = false;
                                                                                                      currentInnerFieldValue = "";
                                                                                                } else if (c == ";") {
                                                                                                      if (currentInnerField == "ItemID" || currentInnerField == "Required") {
                                                                                                            if (currentInnerField == "ItemID") {
                                                                                                                  currentIngredient.id = currentInnerFieldValue;
                                                                                                            } else if (currentInnerField == "Required") {
                                                                                                                  currentIngredient.amount = currentInnerFieldValue;
                                                                                                            }
                                                                                                            currentInnerField = "";
                                                                                                            currentInnerFieldGetValueNow = false;
                                                                                                            currentInnerFieldValue = "";
                                                                                                      } else {
                                                                                                            currentInnerField = "";
                                                                                                            currentInnerFieldGetValueNow = false;
                                                                                                            currentInnerFieldValue = "";
                                                                                                      }
                                                                                                } else if (c == ":") {

                                                                                                } else {
                                                                                                      currentInnerFieldValue += c;
                                                                                                }
                                                                                          } else {
                                                                                                if (c == ")" && !ignoreBrackets) {
                                                                                                      if (currentInnerField != "" && currentInnerFieldValue != "") {
                                                                                                            if (currentInnerField == "ItemID") {
                                                                                                                  currentIngredient.id = currentInnerFieldValue;
                                                                                                            } else if (currentInnerField == "Required") {
                                                                                                                  currentIngredient.amount = currentInnerFieldValue;
                                                                                                            }
                                                                                                      }
                                                                                                      currentFieldValue.push(currentFieldValue);

                                                                                                      currentIngredient = null;
                                                                                                      currentInnerField = "";
                                                                                                      currentInnerFieldGetValueNow = false;
                                                                                                      currentInnerFieldValue = "";
                                                                                                      openBrackets--;
                                                                                                } else if (c == " " || c == "\n") {
                                                                                                      if (currentInnerField != "" && currentInnerFieldValue != "") {
                                                                                                            if (currentInnerField == "ItemID") {
                                                                                                                  currentIngredient.id = currentInnerFieldValue;
                                                                                                            } else if (currentInnerField == "Required") {
                                                                                                                  currentIngredient.amount = currentInnerFieldValue;
                                                                                                            }
                                                                                                      }
                                                                                                      currentInnerField = "";
                                                                                                      currentInnerFieldGetValueNow = false;
                                                                                                      currentInnerFieldValue = "";
                                                                                                } else if (c == ";") {
                                                                                                      if (currentInnerField == "ItemID" || currentInnerField == "Required") {
                                                                                                            if (currentInnerField == "ItemID") {
                                                                                                                  currentIngredient.id = currentInnerFieldValue;
                                                                                                            } else if (currentInnerField == "Required") {
                                                                                                                  currentIngredient.amount = currentInnerFieldValue;
                                                                                                            }
                                                                                                            currentInnerField = "";
                                                                                                            currentInnerFieldGetValueNow = false;
                                                                                                            currentInnerFieldValue = "";
                                                                                                      } else {
                                                                                                            currentInnerField = "";
                                                                                                            currentInnerFieldGetValueNow = false;
                                                                                                            currentInnerFieldValue = "";
                                                                                                      }
                                                                                                } else if (c == ":") {

                                                                                                } else {
                                                                                                      currentInnerFieldValue += c;
                                                                                                }
                                                                                          }
                                                                                    }
                                                                              }
                                                                        } else if (openBrackets == 1) {
                                                                              if (c == " " || c == "\n") {

                                                                              } else if (c == "(") {
                                                                                    openBrackets++;
                                                                                    currentIngredient = new Ingredient("", 0);
                                                                                    currentInnerField = "";
                                                                                    currentInnerFieldGetValueNow = false;
                                                                                    currentInnerFieldValue = "";
                                                                              } else if (c == ";") {
                                                                                    currentObject.ingredients = currentFieldValue;
                                                                                    currentIngredient = null;
                                                                                    currentFieldCheck = "";
                                                                                    currentFieldGetValueNow = false;
                                                                                    currentFieldValue = "";
                                                                                    currentInnerField = "";
                                                                                    currentInnerFieldGetValueNow = false;
                                                                                    currentInnerFieldValue = "";
                                                                              } else if (c == ",") {

                                                                              } else {
                                                                                    currentFieldCheck = "";
                                                                                    currentFieldGetValueNow = false;
                                                                                    currentFieldValue = "";
                                                                                    currentInnerField = "";
                                                                                    currentInnerFieldGetValueNow = false;
                                                                                    currentInnerFieldValue = "";
                                                                              }
                                                                        } else {
                                                                              currentFieldCheck = "";
                                                                              currentFieldGetValueNow = false;
                                                                              currentFieldValue = "";

                                                                              currentInnerField = "";
                                                                              currentInnerFieldGetValueNow = false;
                                                                              currentInnerFieldValue = "";
                                                                        }
                                                                  } else if (currentFieldCheck == "LinkedItemIDs" || currentFieldCheck == "Unlocks") {
                                                                        if (c == " " || c == "\n") {
                                                                              currentFieldCheck = "";
                                                                              currentFieldGetValueNow = false;
                                                                              currentFieldValue = "";

                                                                              currentInnerField = "";
                                                                              currentInnerFieldGetValueNow = false;
                                                                              currentInnerFieldValue = "";
                                                                        } else if (c == ";") {
                                                                              if (currentInnerField != "") {
                                                                                    currentFieldValue.push(currentInnerField);
                                                                              }
                                                                              if (currentFieldCheck == "LinkedItemIDs") {
                                                                                    currentObject.linkeditems = currentFieldValue;
                                                                              } else if (currentFieldCheck == "Unlocks") {
                                                                                    currentObject.unlocks = currentFieldValue;
                                                                              }
                                                                              currentFieldCheck = "";
                                                                              currentFieldGetValueNow = false;
                                                                              currentFieldValue = "";

                                                                              currentInnerField = "";
                                                                              currentInnerFieldGetValueNow = false;
                                                                              currentInnerFieldValue = "";
                                                                        } else if (c == "\"") {
                                                                              currentFieldCheck = "";
                                                                              currentFieldGetValueNow = false;
                                                                              currentFieldValue = "";

                                                                              currentInnerField = "";
                                                                              currentInnerFieldGetValueNow = false;
                                                                              currentInnerFieldValue = "";
                                                                        } else if (c == ",") {
                                                                              if (currentInnerField == "") {

                                                                              } else {
                                                                                    currentFieldValue.push(currentInnerField);
                                                                                    currentInnerField = "";
                                                                              }
                                                                        } else {
                                                                              currentInnerField += c;
                                                                        }
                                                                  } else if (currentFieldCheck == "DisplayName" || currentFieldCheck == "Tooltip") {
                                                                        if (c == ";") {
                                                                              if (currentFieldCheck == "DisplayName") {
                                                                                    currentObject.displayname = currentFieldValue;
                                                                              } else if (currentFieldCheck == "Tooltip") {
                                                                                    currentObject.tooltip = currentFieldValue;
                                                                              }
                                                                              ignoreBrackets = false;
                                                                              currentFieldCheck = "";
                                                                              currentFieldGetValueNow = false;
                                                                              currentFieldValue = "";

                                                                              currentInnerField = "";
                                                                              currentInnerFieldGetValueNow = false;
                                                                              currentInnerFieldValue = "";
                                                                        } else if (c == "\"") {

                                                                        } else {
                                                                              currentFieldValue += c;
                                                                        }
                                                                  } else {
                                                                        if (c == "\n" || c == "," || c == ";") {
                                                                              if (c == ";") {
                                                                                    if (currentFieldCheck == "ItemID") {
                                                                                          currentObject.id = currentFieldValue;
                                                                                    } else if (currentFieldCheck == "AmountCrafted") {
                                                                                          currentObject.amount = currentFieldValue;
                                                                                    } else if (currentFieldCheck == "Path") {
                                                                                          currentObject.path = currentFieldValue;
                                                                                    } else if (currentFieldCheck == "ForceUnlockAtStart") {
                                                                                          if (currentFieldValue == "true" || currentFieldValue == "TRUE" || currentFieldValue == "yes" || currentFieldValue == "YES") {
                                                                                                currentObject.forceunlockdefault = false;
                                                                                                currentObject.forceunlock = true;
                                                                                          } else if (currentFieldValue == "false" || currentFieldValue == "FALSE" || currentFieldValue == "no" || currentFieldValue == "NO") {
                                                                                                currentObject.forceunlockdefault = false;
                                                                                                currentObject.forceunlock = false;
                                                                                          }
                                                                                    } else if (currentFieldCheck == "PdaGroup") {
                                                                                          currentObject.pdagroup = currentFieldValue;
                                                                                    } else if (currentFieldCheck == "PdaCategory") {
                                                                                          currentObject.pdacategory = currentFieldValue;
                                                                                    } else if (currentFieldCheck == "FunctionalID") {
                                                                                          currentObject.functionalid = currentFieldValue;
                                                                                    }
                                                                              }
                                                                              currentFieldCheck = "";
                                                                              currentFieldGetValueNow = false;
                                                                              currentFieldValue = "";

                                                                              currentInnerField = "";
                                                                              currentInnerFieldGetValueNow = false;
                                                                              currentInnerFieldValue = "";
                                                                        } else {
                                                                              currentFieldValue += c;
                                                                        }
                                                                  }
                                                            }
                                                      }
                                                }
                                          }
                                    } else {

                                    }
                              } else if (input_mode === 4) {
                                    if (openBrackets == 0) {
                                          if (c == " " || c == "\n") {

                                          } else if (c == "(") {
                                                currentObject = new CraftingTab("", "", "", "");
                                                openBrackets++;
                                          } else {

                                          }
                                    } else if (openBrackets == 1) {
                                          if (c == ")") {
                                                openBrackets--;
                                                customCraftingTabs.push(currentObject);
                                                currentObject = null;
                                                currentIngredient = null;
                                                currentFieldCheck = "";
                                                currentFieldGetValueNow = false;
                                                currentFieldValue = "";
                                                currentInnerField = "";
                                                currentInnerFieldGetValueNow = false;
                                                currentInnerFieldValue = "";
                                          } else {
                                                if (currentFieldCheck == "") {
                                                      if (c == " " || c == "\n" || c == ":" || c == ";") {
                                                            if (c == ":" || c == ";") {
                                                                  currentFieldCheck = "";
                                                                  currentFieldGetValueNow = false;
                                                                  currentFieldValue = "";
                                                                  currentInnerField = "";
                                                                  currentInnerFieldGetValueNow = false;
                                                                  currentInnerFieldValue = "";
                                                            }
                                                      } else {
                                                            currentFieldCheck += c;
                                                      }
                                                } else {
                                                      if (!currentFieldGetValueNow) {
                                                            if (c == " " || c == "\n") {
                                                                  currentFieldCheck = "";
                                                                  currentFieldGetValueNow = false;
                                                                  currentFieldValue = "";
                                                                  currentInnerField = "";
                                                                  currentInnerFieldGetValueNow = false;
                                                                  currentInnerFieldValue = "";
                                                            } else if (c == ";") {
                                                                  currentFieldCheck = "";
                                                                  currentFieldGetValueNow = false;
                                                                  currentFieldValue = "";

                                                                  currentInnerField = "";
                                                                  currentInnerFieldGetValueNow = false;
                                                                  currentInnerFieldValue = "";
                                                            } else if (c == ":") {
                                                                  if (currentFieldCheck == "TabID" || currentFieldCheck == "DisplayName" || currentFieldCheck == "SpriteItemID" || currentFieldCheck == "ParentTabPath") {
                                                                        currentFieldGetValueNow = true;
                                                                  } else {
                                                                        currentFieldCheck = "";
                                                                        currentFieldGetValueNow = false;
                                                                        currentFieldValue = "";
                                                                        currentInnerField = "";
                                                                        currentInnerFieldGetValueNow = false;
                                                                        currentInnerFieldValue = "";
                                                                  }
                                                            } else {
                                                                  currentFieldCheck += c;
                                                            }
                                                      } else {
                                                            if (currentFieldValue === "") {
                                                                  if (c == " " || c == "\n" || c == ":" || c == ";") {
                                                                        if (c == ";") {
                                                                              currentFieldCheck = "";
                                                                              currentFieldGetValueNow = false;
                                                                              currentFieldValue = "";

                                                                              currentInnerField = "";
                                                                              currentInnerFieldGetValueNow = false;
                                                                              currentInnerFieldValue = "";
                                                                        }
                                                                  } else {
                                                                        if (currentFieldCheck == "DisplayName") {
                                                                              currentFieldValue = "";
                                                                              if (c == "\"") {

                                                                              } else {
                                                                                    currentFieldValue += c;
                                                                              }
                                                                        } else {
                                                                              currentFieldValue += c;
                                                                        }
                                                                  }
                                                            } else {
                                                                  if (currentFieldCheck == "DisplayName") {
                                                                        if (c == ";") {
                                                                              if (currentFieldCheck == "DisplayName") {
                                                                                    currentObject.displayname = currentFieldValue;
                                                                              }
                                                                              currentFieldCheck = "";
                                                                              currentFieldGetValueNow = false;
                                                                              currentFieldValue = "";
                                                                              currentInnerField = "";
                                                                              currentInnerFieldGetValueNow = false;
                                                                              currentInnerFieldValue = "";
                                                                        } else if (c == "\"") {

                                                                        } else {
                                                                              currentFieldValue += c;
                                                                        }
                                                                  } else {
                                                                        if (c == "\n" || c == "," || c == ";") {
                                                                              if (c == ";") {
                                                                                    if (currentFieldCheck == "TabID") {
                                                                                          currentObject.id = currentFieldValue;
                                                                                    } else if (currentFieldCheck == "SpriteItemID") {
                                                                                          currentObject.spriteitemid = currentFieldValue;
                                                                                    } else if (currentFieldCheck == "ParentTabPath") {
                                                                                          currentObject.parenttabpath = currentFieldValue;
                                                                                    }
                                                                              }
                                                                              currentFieldCheck = "";
                                                                              currentFieldGetValueNow = false;
                                                                              currentFieldValue = "";
                                                                              currentInnerField = "";
                                                                              currentInnerFieldGetValueNow = false;
                                                                              currentInnerFieldValue = "";
                                                                        } else {
                                                                              currentFieldValue += c;
                                                                        }
                                                                  }
                                                            }
                                                      }
                                                }
                                          }
                                    } else {

                                    }
                              } else if (input_mode === 5) {
                                    if (openBrackets == 0) {
                                          if (c == " " || c == "\n") {

                                          } else if (c == "(") {
                                                currentObject = new CustomSize("", 1, 1);
                                                openBrackets++;
                                          } else {

                                          }
                                    } else if (openBrackets == 1) {
                                          if (c == ")") {
                                                openBrackets--;
                                                customSizes.push(currentObject);
                                                currentObject = null;
                                                currentIngredient = null;
                                                currentFieldCheck = "";
                                                currentFieldGetValueNow = false;
                                                currentFieldValue = "";
                                                currentInnerField = "";
                                                currentInnerFieldGetValueNow = false;
                                                currentInnerFieldValue = "";
                                          } else {
                                                if (currentFieldCheck == "") {
                                                      if (c == " " || c == "\n" || c == ":" || c == ";") {
                                                            if (c == ":" || c == ";") {
                                                                  currentFieldCheck = "";
                                                                  currentFieldGetValueNow = false;
                                                                  currentFieldValue = "";
                                                                  currentInnerField = "";
                                                                  currentInnerFieldGetValueNow = false;
                                                                  currentInnerFieldValue = "";
                                                            }
                                                      } else {
                                                            currentFieldCheck += c;
                                                      }
                                                } else {
                                                      if (!currentFieldGetValueNow) {
                                                            if (c == " " || c == "\n") {
                                                                  currentFieldCheck = "";
                                                                  currentFieldGetValueNow = false;
                                                                  currentFieldValue = "";
                                                                  currentInnerField = "";
                                                                  currentInnerFieldGetValueNow = false;
                                                                  currentInnerFieldValue = "";
                                                            } else if (c == ";") {
                                                                  currentFieldCheck = "";
                                                                  currentFieldGetValueNow = false;
                                                                  currentFieldValue = "";

                                                                  currentInnerField = "";
                                                                  currentInnerFieldGetValueNow = false;
                                                                  currentInnerFieldValue = "";
                                                            } else if (c == ":") {
                                                                  if (currentFieldCheck == "ItemID" || currentFieldCheck == "Width" || currentFieldCheck == "Height") {
                                                                        currentFieldGetValueNow = true;
                                                                  } else {
                                                                        currentFieldCheck = "";
                                                                        currentFieldGetValueNow = false;
                                                                        currentFieldValue = "";
                                                                        currentInnerField = "";
                                                                        currentInnerFieldGetValueNow = false;
                                                                        currentInnerFieldValue = "";
                                                                  }
                                                            } else {
                                                                  currentFieldCheck += c;
                                                            }
                                                      } else {
                                                            if (currentFieldValue === "") {
                                                                  if (c == " " || c == "\n" || c == ":" || c == ";") {
                                                                        if (c == ";") {
                                                                              currentFieldCheck = "";
                                                                              currentFieldGetValueNow = false;
                                                                              currentFieldValue = "";

                                                                              currentInnerField = "";
                                                                              currentInnerFieldGetValueNow = false;
                                                                              currentInnerFieldValue = "";
                                                                        }
                                                                  } else {
                                                                        currentFieldValue += c;
                                                                  }
                                                            } else {
                                                                  if (c == "\n" || c == "," || c == ";") {
                                                                        if (c == ";") {
                                                                              if (currentFieldCheck == "ItemID") {
                                                                                    currentObject.id = currentFieldValue;
                                                                              } else if (currentFieldCheck == "Width") {
                                                                                    currentObject.width = currentFieldValue;
                                                                              } else if (currentFieldCheck == "Height") {
                                                                                    currentObject.height = currentFieldValue;
                                                                              }
                                                                        }
                                                                        currentFieldCheck = "";
                                                                        currentFieldGetValueNow = false;
                                                                        currentFieldValue = "";
                                                                        currentInnerField = "";
                                                                        currentInnerFieldGetValueNow = false;
                                                                        currentInnerFieldValue = "";
                                                                  } else {
                                                                        currentFieldValue += c;
                                                                  }
                                                            }
                                                      }
                                                }
                                          }
                                    } else {

                                    }
                              } else if (input_mode === 6) {
                                    if (openBrackets == 0) {
                                          if (c == " " || c == "\n") {

                                          } else if (c == "(") {
                                                currentObject = new CustomBioFuel("", 0);
                                                openBrackets++;
                                          } else {

                                          }
                                    } else if (openBrackets == 1) {
                                          if (c == ")") {
                                                openBrackets--;
                                                customBioFuels.push(currentObject);
                                                currentObject = null;
                                                currentIngredient = null;
                                                currentFieldCheck = "";
                                                currentFieldGetValueNow = false;
                                                currentFieldValue = "";
                                                currentInnerField = "";
                                                currentInnerFieldGetValueNow = false;
                                                currentInnerFieldValue = "";
                                          } else {
                                                if (currentFieldCheck == "") {
                                                      if (c == " " || c == "\n" || c == ":" || c == ";") {
                                                            if (c == ":" || c == ";") {
                                                                  currentFieldCheck = "";
                                                                  currentFieldGetValueNow = false;
                                                                  currentFieldValue = "";
                                                                  currentInnerField = "";
                                                                  currentInnerFieldGetValueNow = false;
                                                                  currentInnerFieldValue = "";
                                                            }
                                                      } else {
                                                            currentFieldCheck += c;
                                                      }
                                                } else {
                                                      if (!currentFieldGetValueNow) {
                                                            if (c == " " || c == "\n") {
                                                                  currentFieldCheck = "";
                                                                  currentFieldGetValueNow = false;
                                                                  currentFieldValue = "";
                                                                  currentInnerField = "";
                                                                  currentInnerFieldGetValueNow = false;
                                                                  currentInnerFieldValue = "";
                                                            } else if (c == ";") {
                                                                  currentFieldCheck = "";
                                                                  currentFieldGetValueNow = false;
                                                                  currentFieldValue = "";

                                                                  currentInnerField = "";
                                                                  currentInnerFieldGetValueNow = false;
                                                                  currentInnerFieldValue = "";
                                                            } else if (c == ":") {
                                                                  if (currentFieldCheck == "ItemID" || currentFieldCheck == "Energy") {
                                                                        currentFieldGetValueNow = true;
                                                                  } else {
                                                                        currentFieldCheck = "";
                                                                        currentFieldGetValueNow = false;
                                                                        currentFieldValue = "";
                                                                        currentInnerField = "";
                                                                        currentInnerFieldGetValueNow = false;
                                                                        currentInnerFieldValue = "";
                                                                  }
                                                            } else {
                                                                  currentFieldCheck += c;
                                                            }
                                                      } else {
                                                            if (currentFieldValue === "") {
                                                                  if (c == " " || c == "\n" || c == ":" || c == ";") {
                                                                        if (c == ";") {
                                                                              currentFieldCheck = "";
                                                                              currentFieldGetValueNow = false;
                                                                              currentFieldValue = "";

                                                                              currentInnerField = "";
                                                                              currentInnerFieldGetValueNow = false;
                                                                              currentInnerFieldValue = "";
                                                                        }
                                                                  } else {
                                                                        currentFieldValue += c;
                                                                  }
                                                            } else {
                                                                  if (c == "\n" || c == "," || c == ";") {
                                                                        if (c == ";") {
                                                                              if (currentFieldCheck == "ItemID") {
                                                                                    currentObject.id = currentFieldValue;
                                                                              } else if (currentFieldCheck == "Energy") {
                                                                                    currentObject.fuel = currentFieldValue;
                                                                              }
                                                                        }
                                                                        currentFieldCheck = "";
                                                                        currentFieldGetValueNow = false;
                                                                        currentFieldValue = "";
                                                                        currentInnerField = "";
                                                                        currentInnerFieldGetValueNow = false;
                                                                        currentInnerFieldValue = "";
                                                                  } else {
                                                                        currentFieldValue += c;
                                                                  }
                                                            }
                                                      }
                                                }
                                          }
                                    } else {

                                    }
                              } else if (input_mode === 7) {
                                    if (openBrackets == 0) {
                                          if (c == " " || c == "\n") {

                                          } else if (c == "(") {
                                                currentObject = new CustomFragmentCount("",1);
                                                openBrackets++;
                                          } else {

                                          }
                                    } else if (openBrackets == 1) {
                                          if (c == ")") {
                                                openBrackets--;
                                                customFragmentCount.push(currentObject);
                                                currentObject = null;
                                                currentIngredient = null;
                                                currentFieldCheck = "";
                                                currentFieldGetValueNow = false;
                                                currentFieldValue = "";
                                                currentInnerField = "";
                                                currentInnerFieldGetValueNow = false;
                                                currentInnerFieldValue = "";
                                          } else {
                                                if (currentFieldCheck == "") {
                                                      if (c == " " || c == "\n" || c == ":" || c == ";") {
                                                            if (c == ":" || c == ";") {
                                                                  currentFieldCheck = "";
                                                                  currentFieldGetValueNow = false;
                                                                  currentFieldValue = "";
                                                                  currentInnerField = "";
                                                                  currentInnerFieldGetValueNow = false;
                                                                  currentInnerFieldValue = "";
                                                            }
                                                      } else {
                                                            currentFieldCheck += c;
                                                      }
                                                } else {
                                                      if (!currentFieldGetValueNow) {
                                                            if (c == " " || c == "\n") {
                                                                  currentFieldCheck = "";
                                                                  currentFieldGetValueNow = false;
                                                                  currentFieldValue = "";
                                                                  currentInnerField = "";
                                                                  currentInnerFieldGetValueNow = false;
                                                                  currentInnerFieldValue = "";
                                                            } else if (c == ";") {
                                                                  currentFieldCheck = "";
                                                                  currentFieldGetValueNow = false;
                                                                  currentFieldValue = "";

                                                                  currentInnerField = "";
                                                                  currentInnerFieldGetValueNow = false;
                                                                  currentInnerFieldValue = "";
                                                            } else if (c == ":") {
                                                                  if (currentFieldCheck == "ItemID" || currentFieldCheck == "FragmentsToScan") {
                                                                        currentFieldGetValueNow = true;
                                                                  } else {
                                                                        currentFieldCheck = "";
                                                                        currentFieldGetValueNow = false;
                                                                        currentFieldValue = "";
                                                                        currentInnerField = "";
                                                                        currentInnerFieldGetValueNow = false;
                                                                        currentInnerFieldValue = "";
                                                                  }
                                                            } else {
                                                                  currentFieldCheck += c;
                                                            }
                                                      } else {
                                                            if (currentFieldValue === "") {
                                                                  if (c == " " || c == "\n" || c == ":" || c == ";") {
                                                                        if (c == ";") {
                                                                              currentFieldCheck = "";
                                                                              currentFieldGetValueNow = false;
                                                                              currentFieldValue = "";

                                                                              currentInnerField = "";
                                                                              currentInnerFieldGetValueNow = false;
                                                                              currentInnerFieldValue = "";
                                                                        }
                                                                  } else {
                                                                        currentFieldValue += c;
                                                                  }
                                                            } else {
                                                                  if (c == "\n" || c == "," || c == ";") {
                                                                        if (c == ";") {
                                                                              if (currentFieldCheck == "ItemID") {
                                                                                    currentObject.id = currentFieldValue;
                                                                              } else if (currentFieldCheck == "FragmentsToScan") {
                                                                                    currentObject.amount = currentFieldValue;
                                                                              }
                                                                        }
                                                                        currentFieldCheck = "";
                                                                        currentFieldGetValueNow = false;
                                                                        currentFieldValue = "";
                                                                        currentInnerField = "";
                                                                        currentInnerFieldGetValueNow = false;
                                                                        currentInnerFieldValue = "";
                                                                  } else {
                                                                        currentFieldValue += c;
                                                                  }
                                                            }
                                                      }
                                                }
                                          }
                                    } else {

                                    }
                              } else if (input_mode === 8) {
                                    if (openBrackets == 0) {
                                          if (c == " " || c == "\n") {

                                          } else if (c == "(") {
                                                currentObject = new MovedRecipe("","","",true,false);
                                                openBrackets++;
                                          } else {

                                          }
                                    } else if (openBrackets == 1) {
                                          if (c == ")") {
                                                openBrackets--;
                                                movedRecipes.push(currentObject);
                                                currentObject = null;
                                                currentIngredient = null;
                                                currentFieldCheck = "";
                                                currentFieldGetValueNow = false;
                                                currentFieldValue = "";
                                                currentInnerField = "";
                                                currentInnerFieldGetValueNow = false;
                                                currentInnerFieldValue = "";
                                          } else {
                                                if (currentFieldCheck == "") {
                                                      if (c == " " || c == "\n" || c == ":" || c == ";") {
                                                            if (c == ":" || c == ";") {
                                                                  currentFieldCheck = "";
                                                                  currentFieldGetValueNow = false;
                                                                  currentFieldValue = "";
                                                                  currentInnerField = "";
                                                                  currentInnerFieldGetValueNow = false;
                                                                  currentInnerFieldValue = "";
                                                            }
                                                      } else {
                                                            currentFieldCheck += c;
                                                      }
                                                } else {
                                                      if (!currentFieldGetValueNow) {
                                                            if (c == " " || c == "\n") {
                                                                  currentFieldCheck = "";
                                                                  currentFieldGetValueNow = false;
                                                                  currentFieldValue = "";
                                                                  currentInnerField = "";
                                                                  currentInnerFieldGetValueNow = false;
                                                                  currentInnerFieldValue = "";
                                                            } else if (c == ";") {
                                                                  currentFieldCheck = "";
                                                                  currentFieldGetValueNow = false;
                                                                  currentFieldValue = "";

                                                                  currentInnerField = "";
                                                                  currentInnerFieldGetValueNow = false;
                                                                  currentInnerFieldValue = "";
                                                            } else if (c == ":") {
                                                                  if (currentFieldCheck == "ItemID" || currentFieldCheck == "OldPath" || currentFieldCheck == "NewPath" || currentFieldCheck == "Hidden") {
                                                                        currentFieldGetValueNow = true;
                                                                  } else {
                                                                        currentFieldCheck = "";
                                                                        currentFieldGetValueNow = false;
                                                                        currentFieldValue = "";
                                                                        currentInnerField = "";
                                                                        currentInnerFieldGetValueNow = false;
                                                                        currentInnerFieldValue = "";
                                                                  }
                                                            } else {
                                                                  currentFieldCheck += c;
                                                            }
                                                      } else {
                                                            if (currentFieldValue === "") {
                                                                  if (c == " " || c == "\n" || c == ":" || c == ";") {
                                                                        if (c == ";") {
                                                                              currentFieldCheck = "";
                                                                              currentFieldGetValueNow = false;
                                                                              currentFieldValue = "";

                                                                              currentInnerField = "";
                                                                              currentInnerFieldGetValueNow = false;
                                                                              currentInnerFieldValue = "";
                                                                        }
                                                                  } else {
                                                                        currentFieldValue += c;
                                                                  }
                                                            } else {
                                                                  if (c == "\n" || c == "," || c == ";") {
                                                                        if (c == ";") {
                                                                              if (currentFieldCheck == "ItemID") {
                                                                                    currentObject.id = currentFieldValue;
                                                                              } else if (currentFieldCheck == "OldPath") {
                                                                                    currentObject.opath = currentFieldValue;
                                                                              } else if (currentFieldCheck == "NewPath") {
                                                                                    currentObject.npath = currentFieldValue;
                                                                              } else if (currentFieldCheck == "Hidden") {
                                                                                    if (currentFieldValue == "true" || currentFieldValue == "TRUE" || currentFieldValue == "yes" || currentFieldValue == "YES") {
                                                                                          currentObject.hiddendefault = false;
                                                                                          currentObject.hidden = true;
                                                                                    } else if (currentFieldValue == "false" || currentFieldValue == "FALSE" || currentFieldValue == "no" || currentFieldValue == "NO") {
                                                                                          currentObject.hiddendefault = false;
                                                                                          currentObject.hidden = false;
                                                                                    }
                                                                              }
                                                                        }
                                                                        currentFieldCheck = "";
                                                                        currentFieldGetValueNow = false;
                                                                        currentFieldValue = "";
                                                                        currentInnerField = "";
                                                                        currentInnerFieldGetValueNow = false;
                                                                        currentInnerFieldValue = "";
                                                                  } else {
                                                                        currentFieldValue += c;
                                                                  }
                                                            }
                                                      }
                                                }
                                          }
                                    } else {

                                    }
                              }
                        }
                  } else {
                        if (!currentlineComment) {
                              if (c == "#") {
                                    currentlineComment = true;
                              }
                        } else {
                              if (c == "#") {
                                    //currentlineComment = true;
                                    currentlineComment = false;
                              } else if (c == "\n") {
                                    //currentlineComment = false;
                              } else {

                              }
                        }
                  }
            }
      });

      if (input_mode === 1) {
            var __o = new OutputData(addedRecipes, 1);
            return __o;
      } else if (input_mode === 2) {
            var __o = new OutputData(modifiedRecipes, 2);
            return __o;
      } else if (input_mode === 3) {
            var __o = new OutputData(aliasRecipes, 3);
            return __o;
      } else if (input_mode === 4) {
            var __o = new OutputData(customCraftingTabs, 4);
            return __o;
      } else if (input_mode === 5) {
            var __o = new OutputData(customSizes, 5);
            return __o;
      } else if (input_mode === 6) {
            var __o = new OutputData(customBioFuels, 6);
            return __o;
      } else if (input_mode === 7) {
            var __o = new OutputData(customFragmentCount, 7);
            return __o;
      } else if (input_mode === 8) {
            var __o = new OutputData(movedRecipes, 8);
            return __o;
      } else {
            var __o = new OutputData([], 0);
            return __o;
      }
}

function toCString(idata, imode) {

      var data;
      var mode;

      if (imode === undefined) {
            data = idata.data;
            mode = idata.mode;
      } else {
            data = idata;
            mode = imode;
      }

      var output = "";

      if (mode === 1) {
            var addedcount = data.length;
            data.forEach((v, i) => {
                  if (i === 0) {
                        output += "AddedRecipes: " + newline + "(" + newline;
                  } else {
                        output += "," + newline + "(" + newline;
                  }
                  output += tab + "ItemID: " + v.id + ";" + newline;
                  if (v.amount >= 0) {
                        output += tab + "AmountCrafted: " + v.amount + ";" + newline;
                  }
                  var ingredientscount = v.ingredients.length;
                  v.ingredients.forEach((vv, ii) => {
                        if (ii === 0) {
                              output += tab + "Ingredients: " + newline + tab + "(" + newline;
                        } else {
                              output += "," + newline + tab + "(" + newline;
                        }
                        output += tab + tab + "ItemID: " + vv.id + ";" + newline;
                        output += tab + tab + "Required: " + vv.amount + ";" + newline;
                        output += tab + ")";
                        if (ii + 1 >= ingredientscount) {
                              output += ";" + newline;
                        }
                  });
                  var linkeditemscount = v.linkeditems.length;
                  v.linkeditems.forEach((vv, ii) => {
                        if (ii === 0) {
                              output += tab + "LinkedItemIDs: ";
                        } else {
                              output += ",";
                        }
                        output += vv;
                        if (ii + 1 >= linkeditemscount) {
                              output += ";" + newline;
                        }
                  });
                  var unlocksitemscount = v.unlocks.length;
                  v.unlocks.forEach((vv, ii) => {
                        if (ii === 0) {
                              output += tab + "Unlocks: ";
                        } else {
                              output += ",";
                        }
                        output += vv;
                        if (ii + 1 >= unlocksitemscount) {
                              output += ";" + newline;
                        }
                  });
                  if (v.path !== "") {
                        output += tab + "Path: " + v.path + ";" + newline;
                  }
                  if (v.forceunlockdefault !== true) {
                        output += tab + "ForceUnlockAtStart: " + (v.forceunlock ? "YES" : "NO") + ";" + newline;
                  }
                  if (v.pdagroup !== "") {
                        output += tab + "PdaGroup: " + v.pdagroup + ";" + newline;
                  }
                  if (v.pdacategory !== "") {
                        output += tab + "PdaCategory: " + v.pdacategory + ";" + newline;
                  }
                  output += ")";
                  if (i + 1 >= addedcount) {
                        output += ";" + newline;
                  }
            });
      } else if (mode === 2) {
            var modifiedcount = data.length;
            data.forEach((v, i) => {
                  if (i === 0) {
                        output += "ModifiedRecipes: " + newline + "(" + newline;
                  } else {
                        output += "," + newline + "(" + newline;
                  }
                  output += tab + "ItemID: " + v.id + ";" + newline;
                  if (v.amount >= 0) {
                        output += tab + "AmountCrafted: " + v.amount + ";" + newline;
                  }
                  var ingredientscount = v.ingredients.length;
                  v.ingredients.forEach((vv, ii) => {
                        if (ii === 0) {
                              output += tab + "Ingredients: " + newline + tab + "(" + newline;
                        } else {
                              output += "," + newline + tab + "(" + newline;
                        }
                        output += tab + tab + "ItemID: " + vv.id + ";" + newline;
                        output += tab + tab + "Required: " + vv.amount + ";" + newline;
                        output += tab + ")";
                        if (ii + 1 >= ingredientscount) {
                              output += ";" + newline;
                        }
                  });
                  var linkeditemscount = v.linkeditems.length;
                  v.linkeditems.forEach((vv, ii) => {
                        if (ii === 0) {
                              output += tab + "LinkedItemIDs: ";
                        } else {
                              output += ",";
                        }
                        output += vv;
                        if (ii + 1 >= linkeditemscount) {
                              output += ";" + newline;
                        }
                  });
                  var unlocksitemscount = v.unlocks.length;
                  v.unlocks.forEach((vv, ii) => {
                        if (ii === 0) {
                              output += tab + "Unlocks: ";
                        } else {
                              output += ",";
                        }
                        output += vv;
                        if (ii + 1 >= unlocksitemscount) {
                              output += ";" + newline;
                        }
                  });
                  if (v.forceunlockdefault !== true) {
                        output += tab + "ForceUnlockAtStart: " + (v.forceunlock ? "YES" : "NO") + ";" + newline;
                  }
                  output += ")";
                  if (i + 1 >= modifiedcount) {
                        output += ";" + newline;
                  }
            });
      } else if (mode === 3) {
            var aliascount = data.length;
            data.forEach((v, i) => {
                  if (i === 0) {
                        output += "AliasRecipes: " + newline + "(" + newline;
                  } else {
                        output += "," + newline + "(" + newline;
                  }
                  output += tab + "ItemID: " + v.id + ";" + newline;
                  if (v.displayname !== "") {
                        output += tab + "DisplayName: " + "\"" + v.displayname + "\"" + ";" + newline;
                  }
                  if (v.tooltip !== "") {
                        output += tab + "Tooltip: " + "\"" + v.tooltip + "\"" + ";" + newline;
                  }
                  if (v.amount >= 0) {
                        output += tab + "AmountCrafted: " + v.amount + ";" + newline;
                  }
                  var ingredientscount = v.ingredients.length;
                  v.ingredients.forEach((vv, ii) => {
                        if (ii === 0) {
                              output += tab + "Ingredients: " + newline + tab + "(" + newline;
                        } else {
                              output += "," + newline + tab + "(" + newline;
                        }
                        output += tab + tab + "ItemID: " + vv.id + ";" + newline;
                        output += tab + tab + "Required: " + vv.amount + ";" + newline;
                        output += tab + ")";
                        if (ii + 1 >= ingredientscount) {
                              output += ";" + newline;
                        }
                  });
                  var linkeditemscount = v.linkeditems.length;
                  v.linkeditems.forEach((vv, ii) => {
                        if (ii === 0) {
                              output += tab + "LinkedItemIDs: ";
                        } else {
                              output += ",";
                        }
                        output += vv;
                        if (ii + 1 >= linkeditemscount) {
                              output += ";" + newline;
                        }
                  });
                  var unlocksitemscount = v.unlocks.length;
                  v.unlocks.forEach((vv, ii) => {
                        if (ii === 0) {
                              output += tab + "Unlocks: ";
                        } else {
                              output += ",";
                        }
                        output += vv;
                        if (ii + 1 >= unlocksitemscount) {
                              output += ";" + newline;
                        }
                  });
                  if (v.path !== "") {
                        output += tab + "Path: " + v.path + ";" + newline;
                  }
                  if (v.forceunlockdefault !== true) {
                        output += tab + "ForceUnlockAtStart: " + (v.forceunlock ? "YES" : "NO") + ";" + newline;
                  }
                  if (v.pdagroup !== "") {
                        output += tab + "PdaGroup: " + v.pdagroup + ";" + newline;
                  }
                  if (v.pdacategory !== "") {
                        output += tab + "PdaCategory: " + v.pdacategory + ";" + newline;
                  }
                  if (v.functionalid !== "") {
                        output += tab + "FunctionalID: " + v.functionalid + ";" + newline;
                  }
                  output += ")";
                  if (i + 1 >= aliascount) {
                        output += ";" + newline;
                  }
            });
      } else if (mode === 4) {
            var craftingtabscount = data.length;
            data.forEach((v, i) => {
                  if (i === 0) {
                        output += "CustomCraftingTabs: " + newline + "(" + newline;
                  } else {
                        output += "," + newline + "(" + newline;
                  }
                  output += tab + "TabID: " + v.id + ";" + newline;
                  if (v.displayname !== "") {
                        output += tab + "DisplayName: " + "\"" + v.displayname + "\"" + ";" + newline;
                  }
                  if (v.spriteitemid !== "") {
                        output += tab + "SpriteItemID: " + v.spriteitemid + ";" + newline;
                  }
                  if (v.parenttabpath !== "") {
                        output += tab + "ParentTabPath: " + v.parenttabpath + ";" + newline;
                  }
                  output += ")";
                  if (i + 1 >= craftingtabscount) {
                        output += ";" + newline;
                  }
            });
      } else if (mode === 5) {
            var customsizescount = data.length;
            data.forEach((v, i) => {
                  if (i === 0) {
                        output += "CustomSizes: " + newline + "(" + newline;
                  } else {
                        output += "," + newline + "(" + newline;
                  }
                  output += tab + "ItemID: " + v.id + ";" + newline;
                  output += tab + "Width: " + v.width + ";" + newline;
                  output += tab + "Height: " + v.height + ";" + newline;
                  output += ")";
                  if (i + 1 >= customsizescount) {
                        output += ";" + newline;
                  }
            });
      } else if (mode === 6) {
            var custombiofuelscount = data.length;
            data.forEach((v, i) => {
                  if (i === 0) {
                        output += "CustomBioFuels: " + newline + "(" + newline;
                  } else {
                        output += "," + newline + "(" + newline;
                  }
                  output += tab + "ItemID: " + v.id + ";" + newline;
                  output += tab + "Energy: " + v.fuel + ";" + newline;
                  output += ")";
                  if (i + 1 >= custombiofuelscount) {
                        output += ";" + newline;
                  }
            });
      } else if (mode === 7) {
            var customfragmentcountcount = data.length;
            data.forEach((v, i) => {
                  if (i === 0) {
                        output += "CustomFragmentCounts: " + newline + "(" + newline;
                  } else {
                        output += "," + newline + "(" + newline;
                  }
                  output += tab + "ItemID: " + v.id + ";" + newline;
                  output += tab + "FragmentsToScan: " + v.amount + ";" + newline;
                  output += ")";
                  if (i + 1 >= customfragmentcountcount) {
                        output += ";" + newline;
                  }
            });
      } else if (mode === 8) {
            var movedrecipecount = data.length;
            data.forEach((v, i) => {
                  if (i === 0) {
                        output += "MovedRecipes: " + newline + "(" + newline;
                  } else {
                        output += "," + newline + "(" + newline;
                  }
                  output += tab + "ItemID: " + v.id + ";" + newline;
                  output += tab + "OldPath: " + v.opath + ";" + newline;
                  if (v.npath !== "") {
                        output += tab + "NewPath: " + v.npath + ";" + newline;
                  }
                  if (v.hiddendefault !== true) {
                        output += tab + "Hidden: " + (v.hidden ? "YES" : "NO") + ";" + newline;
                  }
                  output += ")";
                  if (i + 1 >= movedrecipecount) {
                        output += ";" + newline;
                  }
            });
      }


      return output;
}


const newline = "\n";
const tab = "    ";

// CLASSES

class OutputData {
      constructor(data, mode) {
            this.data = data;
            this.mode = mode;
      }
}

class Recipe {
      constructor(id, amount, ingredients, linkeditems, forceunlock, forceunlockdefault, unlocks, path, displayname, tooltip,pdagroup,pdacategory,functionalid) {
            this.id = id;
            this.amount = amount;
            this.ingredients = ingredients;
            this.linkeditems = linkeditems;
            this.forceunlock = forceunlock;
            this.forceunlockdefault = forceunlockdefault;
            this.unlocks = unlocks; // MODIFIED END
            this.path = path; // ADDED END
            this.displayname = displayname;
            this.tooltip = tooltip; // ALIAS END
            this.pdagroup = pdagroup;
            this.pdacategory = pdacategory;
            this.functionalid = functionalid;
      }
}

class Ingredient {
      constructor(id, amount) {
            this.id = id;
            this.amount = amount;
      }
}

class CraftingTab {
      constructor(id, displayname, spriteitemid, parenttabpath) {
            this.id = id;
            this.displayname = displayname;
            this.spriteitemid = spriteitemid;
            this.parenttabpath = parenttabpath;
      }
}

class CustomSize {
      constructor(id, width, height) {
            this.id = id;
            this.width = width;
            this.height = height;
      }
}

class CustomBioFuel {
      constructor(id, fuel) {
            this.id = id;
            this.fuel = fuel;
      }
}

class CustomFragmentCount {
      constructor(id,amount) {
            this.id = id;
            this.amount = amount;
      }
}

class MovedRecipe {
      constructor(id,opath,npath,hiddendefault,hidden) {
            this.id = id;
            this.opath = opath;
            this.npath = npath;
            this.hiddendefault = hiddendefault;
            this.hidden = hidden;
      }
}