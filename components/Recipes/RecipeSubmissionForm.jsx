"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X, Upload } from "lucide-react";
import { BASE_URL } from "@/utils/constants";

// Recipe categories from the provided data
const categories = [
  { id: "1", name: "Beef" },
  { id: "2", name: "Chicken" },
  { id: "3", name: "Dessert" },
  { id: "4", name: "Lamb" },
  { id: "5", name: "Miscellaneous" },
  { id: "6", name: "Pasta" },
  { id: "7", name: "Pork" },
  { id: "8", name: "Seafood" },
  { id: "9", name: "Side" },
  { id: "10", name: "Starter" },
  { id: "11", name: "Vegan" },
  { id: "12", name: "Vegetarian" },
  { id: "13", name: "Breakfast" },
  { id: "14", name: "Goat" },
];

const RecipeSubmissionForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: false,
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    recipeName: "",
    category: "",
    ingredients: [""],
    instructions: [""],
    image: null,
  });
  const [errors, setErrors] = useState({});

  const totalSteps = 4;

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      setFormData((prev) => ({
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index),
      }));
    }
  };

  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }));
  };

  const removeInstruction = (index) => {
    if (formData.instructions.length > 1) {
      setFormData((prev) => ({
        ...prev,
        instructions: prev.instructions.filter((_, i) => i !== index),
      }));
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.recipeName.trim()) {
          newErrors.recipeName = "Recipe name is required";
        } else if (formData.recipeName.trim().length < 3) {
          newErrors.recipeName = "Recipe name must be at least 3 characters";
        }
        if (!formData.category) {
          newErrors.category = "Please select a category";
        }
        break;
      case 2:
        const validIngredients = formData.ingredients.filter((ing) =>
          ing.trim()
        );
        if (validIngredients.length === 0) {
          newErrors.ingredients = "At least one ingredient is required";
        } else {
          formData.ingredients.forEach((ingredient, index) => {
            if (!ingredient.trim()) {
              newErrors[`ingredients.${index}`] = "Ingredient name is required";
            }
          });
        }
        break;
      case 3:
        const validInstructions = formData.instructions.filter((inst) =>
          inst.trim()
        );
        if (validInstructions.length === 0) {
          newErrors.instructions = "At least one instruction step is required";
        } else {
          formData.instructions.forEach((instruction, index) => {
            if (!instruction.trim()) {
              newErrors[`instructions.${index}`] =
                "Step description is required";
            }
          });
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
    // Clear error when user starts typing
    if (errors[`${field}.${index}`]) {
      setErrors((prev) => ({
        ...prev,
        [`${field}.${index}`]: undefined,
      }));
    }
  };

  const onSubmit = async () => {
    try {
      setStatus({ loading: true, error: "", success: false });

      const response = await fetch(`${BASE_URL}/api/recipes/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          image:
            "https://cdn.pixabay.com/photo/2020/10/20/17/57/pasta-5671106_1280.jpg",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus({ loading: false, error: "", success: true });
        setIsFormOpen(false);
        setFormData({
          recipeName: "",
          category: "",
          ingredients: [""],
          instructions: [""],
          image: null,
        });
        setCurrentStep(1);
      } else {
        console.error("Failed to add recipe:", data);
        setStatus({
          loading: false,
          error: data.message || "Failed to add recipe",
          success: false,
        });
      }
    } catch (error) {
      console.error("Error submitting recipe:", error);
      // Handle error (show notification, etc.)
      setStatus({
        loading: false,
        error: "An error occurred while submitting the recipe",
        success: false,
      });
    }
  };

  if (!isFormOpen) {
    return (
      <div className="flex items-center h-screen justify-center">
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Recipe
        </button>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-yellow-900 mb-6">
              Basic Recipe Details
            </h2>

            {/* Recipe Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipe Name
              </label>
              <input
                type="text"
                value={formData.recipeName}
                onChange={(e) =>
                  handleInputChange("recipeName", e.target.value)
                }
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 outline-none ${
                  errors.recipeName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter recipe name"
              />
              {errors.recipeName && (
                <p className="mt-1 text-sm text-red-600">{errors.recipeName}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 outline-none ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-yellow-900 mb-6">
              Ingredients
            </h2>

            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-800 font-medium text-sm mt-2">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) =>
                      handleArrayChange("ingredients", index, e.target.value)
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 outline-none ${
                      errors[`ingredients.${index}`]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter ingredient name"
                  />
                  {errors[`ingredients.${index}`] && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors[`ingredients.${index}`]}
                    </p>
                  )}
                </div>
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addIngredient}
              className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-medium"
            >
              <Plus size={20} />
              Add Ingredient
            </button>

            {errors.ingredients && (
              <p className="text-sm text-red-600">{errors.ingredients}</p>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-yellow-900 mb-6">
              Instructions
            </h2>

            {formData.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-800 font-medium text-sm mt-2">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <textarea
                    value={instruction}
                    onChange={(e) =>
                      handleArrayChange("instructions", index, e.target.value)
                    }
                    rows="3"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 outline-none resize-none ${
                      errors[`instructions.${index}`]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder={`Step ${index + 1} instructions...`}
                  />
                  {errors[`instructions.${index}`] && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors[`instructions.${index}`]}
                    </p>
                  )}
                </div>
                {formData.instructions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addInstruction}
              className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-medium"
            >
              <Plus size={20} />
              Add Step
            </button>

            {errors.instructions && (
              <p className="text-sm text-red-600">{errors.instructions}</p>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-yellow-900 mb-6">
              Upload Image
            </h2>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipe Image (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {imagePreview ? (
                  <div className="space-y-4">
                    <img
                      src={imagePreview}
                      alt="Recipe preview"
                      className="mx-auto max-h-64 rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData((prev) => ({ ...prev, image: null }));
                      }}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div>
                      <label className="cursor-pointer">
                        <span className="text-yellow-600 hover:text-yellow-700 font-medium">
                          Click to upload an image
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      <p className="text-gray-500 text-sm mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 pt-12">
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-bold text-4xl text-yellow-900 mb-4">
                Submit Your Recipe
              </h1>
              <p className="text-gray-700">
                Share your delicious recipe with the community
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm   font-medium text-gray-700">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div>
                {renderStep()}

                {/* Navigation Buttons */}
                {status.error && (
                  <div className="p-3 mt-3 bg-red-50 border flex items-center justify-center border-red-200 rounded-md">
                    <p className="text-red-600 text-sm">{status.error}</p>
                  </div>
                )}

                {status.success && (
                  <div className="p-3 mt-3 bg-green-50 flex items-center justify-center border border-green-200 rounded-md">
                    <p className="text-green-600 text-sm">
                      Recipe added successful!
                    </p>
                  </div>
                )}
                <div className="flex justify-between mt-8">
                  <div>
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        <ChevronLeft size={20} />
                        Previous
                      </button>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      disabled={status.loading}
                      onClick={() => setIsFormOpen(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>

                    {currentStep < totalSteps ? (
                      <button
                        type="button"
                        disabled={status.loading}
                        onClick={nextStep}
                        className="flex items-center gap-2 bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
                      >
                        Next
                        <ChevronRight size={20} />
                      </button>
                    ) : (
                      <button
                        disabled={status.loading}
                        type="button"
                        onClick={onSubmit}
                        className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
                      >
                        {status.loading ? "Submitting" : "Submit Recipe"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeSubmissionForm;
