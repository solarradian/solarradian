

import React, { useState, useEffect } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import fetchUsersDetails from "../utils/fetchUsersDetails";
import { useDispatch, useSelector } from 'react-redux';
import { setUsersDetails } from '../store/usersSlice.js';
import toast from "react-hot-toast";

const CreateProject = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const [formData, setFormData] = useState({
    customer: "",
    businessHead: [],
    projectHead: [],
    projectType: "",
    capacityKW: "",
    location: "",
    status: "",
    startDate: "",
    endDate: "",
    inverterData: {
      brand: "",
      model: "",
      serialNumber: "",
      capacity: "",
      technologyType: "",
      gridType: "",
      warrantyYears: ""
    },
    panelsData: [{
      brand: "",
      model: "",
      capacity: "",
      efficiency: "",
      warrantyYears: "",
      type: "",
      serialNumber: ""
    }]
  });

  // Technology and type options
  const technologyTypes = ["String", "Central", "Microinverter"];
  const gridTypes = ["On-Grid", "Off-Grid", "Hybrid"];
  const panelTypes = ["Monocrystalline", "Polycrystalline", "Thin Film"];
  const dispatch = useDispatch();

  // Load users
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch users with their address details
        const usersData = await fetchUsersDetails();
        console.log("Full API response:", usersData);

        if (usersData?.users) {
          setUsers(usersData.users);
          dispatch(setUsersDetails(usersData.users));
        } else {
          console.error("No users data received");
          toast.error("Failed to load user data");
        }
      } catch (err) {
        console.error("Error loading data:", err);
        toast.error("Failed to load required data. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  // Handle customer change to show address selection
  const handleCustomerChange = (e) => {
    const customerId = e.target.value;

    // Update customer field
    setFormData(prev => ({
      ...prev,
      customer: customerId,
      location: "" // Reset location when customer changes
    }));

    // Find the selected customer to show their addresses
    if (customerId) {
      const customer = users.find(user => user._id === customerId);
      setSelectedCustomer(customer);
    } else {
      setSelectedCustomer(null);
    }

    // Clear error when field is updated
    if (errors.customer) {
      setErrors(prev => ({
        ...prev,
        customer: ""
      }));
    }
  };

  // Handle address selection from dropdown
  const handleAddressSelect = (address) => {

   
    
    setFormData(prev => ({
      ...prev,
      location: address
    }));

    setShowAddressDropdown(false);

    // Clear error when field is updated
    if (errors.location) {
      setErrors(prev => ({
        ...prev,
        location: ""
      }));
    }
  };

  // Handle manual location input
  const handleLocationChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      location: value
    }));

    // Clear error when field is updated
    if (errors.location) {
      setErrors(prev => ({
        ...prev,
        location: ""
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.customer) {
      newErrors.customer = "Customer is required";
    }

    if (formData.businessHead.length === 0) {
      newErrors.businessHead = "At least one Business Head is required";
    }

    if (formData.projectHead.length === 0) {
      newErrors.projectHead = "At least one Project Head is required";
    }

    if (!formData.inverterData.brand || !formData.inverterData.model ||
      !formData.inverterData.serialNumber || !formData.inverterData.capacity) {
      newErrors.inverter = "Inverter details are required";
    }

    // Validate each panel
    const panelErrors = [];
    formData.panelsData.forEach((panel, index) => {
      if (!panel.brand || !panel.model || !panel.serialNumber || !panel.capacity) {
        panelErrors[index] = "Panel details are incomplete";
      }
    });
    
    if (panelErrors.length > 0) {
      newErrors.panels = "All panels must have complete details";
      newErrors.panelErrors = panelErrors;
    }

    if (!formData.capacityKW || formData.capacityKW <= 0) {
      newErrors.capacityKW = "Valid capacity is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if it's a nested field (inverterData or panelsData)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Handle panel data changes
  const handlePanelChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPanels = [...formData.panelsData];
    updatedPanels[index] = {
      ...updatedPanels[index],
      [name]: value
    };

    setFormData(prev => ({
      ...prev,
      panelsData: updatedPanels
    }));

    // Clear panel errors when field is updated
    if (errors.panelErrors && errors.panelErrors[index]) {
      const updatedPanelErrors = {...errors.panelErrors};
      delete updatedPanelErrors[index];
      
      setErrors(prev => ({
        ...prev,
        panelErrors: Object.keys(updatedPanelErrors).length > 0 ? updatedPanelErrors : null
      }));
    }
  };

  // Add new panel field
  const addPanel = () => {
    setFormData(prev => ({
      ...prev,
      panelsData: [
        ...prev.panelsData,
        {
          brand: "",
          model: "",
          capacity: "",
          efficiency: "",
          warrantyYears: "",
          type: "",
          serialNumber: ""
        }
      ]
    }));
  };

  // Remove panel field
  const removePanel = (index) => {
    if (formData.panelsData.length > 1) {
      const updatedPanels = [...formData.panelsData];
      updatedPanels.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        panelsData: updatedPanels
      }));
    }
  };

  // Handle multi-select (businessHead, projectHead)
  const handleMultiSelectChange = (e) => {
    const { name, selectedOptions } = e.target;
    const values = Array.from(selectedOptions, (opt) => opt.value);
    setFormData((prev) => ({
      ...prev,
      [name]: values,
    }));

    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the form errors before submitting");
      return;
    }

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.createProject,
        data: formData
      });

      toast.success(response.data.message || "Project created successfully");

      // Reset form
      setFormData({
        customer: "",
        businessHead: [],
        projectHead: [],
        projectType: "",
        capacityKW: "",
        location: "",
        status: "",
        startDate: "",
        endDate: "",
        inverterData: {
          brand: "",
          model: "",
          serialNumber: "",
          capacity: "",
          technologyType: "",
          gridType: "",
          warrantyYears: ""
        },
        panelsData: [{
          brand: "",
          model: "",
          capacity: "",
          efficiency: "",
          warrantyYears: "",
          type: "",
          serialNumber: ""
        }]
      });
      setSelectedCustomer(null);
      setErrors({});
    } catch (error) {
      console.error("Error creating project:", error);
      const errorMessage = error.response?.data?.message || "Failed to create project. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Helper to display selected values for multi-select
  const displaySelectedValues = (selectedIds) => {
    return selectedIds.map(id => {
      const user = users.find(u => u._id === id);
      return user ? user.name : "Unknown";
    }).join(", ") || "None selected";
  };

  // Get filtered users by role
  const getUsersByRole = (role) => {
    return users.filter(user => user.role === role);
  };

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto flex justify-center items-center h-64">
        <div className="text-xl">Loading data...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Customer */}
        <div>
          <label className="block text-sm font-medium mb-1">Customer *</label>
          <select
            name="customer"
            value={formData.customer}
            onChange={handleCustomerChange}
            className={`w-full border p-2 rounded ${errors.customer ? 'border-red-500' : 'border-gray-300'}`}
            required
          >
            <option value="">Select Customer</option>
            {getUsersByRole("Customer").length > 0 ? (
              getUsersByRole("Customer").map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email})
                </option>
              ))
            ) : (
              <option value="" disabled>No customers found</option>
            )}
          </select>
          {errors.customer && <p className="text-red-500 text-sm mt-1">{errors.customer}</p>}
        </div>

        {/* Location Input with Address Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">
            {selectedCustomer ? "Project Location *" : "Location *"}
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleLocationChange}
            onFocus={() => selectedCustomer && setShowAddressDropdown(true)}
            onBlur={() => setTimeout(() => setShowAddressDropdown(false), 200)}
            className={`w-full border p-2 rounded ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
            required
            placeholder="Enter project location or select from customer addresses"
          />

          {/* Address Dropdown */}
          {showAddressDropdown && selectedCustomer && selectedCustomer.address_details && selectedCustomer.address_details.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {selectedCustomer.address_details.map((address, index) => (
                <div
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleAddressSelect(address)}
                >
                {address}
                </div>
              ))}
            </div>
          )}

          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        {/* Business Heads */}
        <div>
          <label className="block text-sm font-medium mb-1">Business Head(s) *</label>
          <select
            name="businessHead"
            multiple
            value={formData.businessHead}
            onChange={handleMultiSelectChange}
            className={`w-full border p-2 rounded h-32 ${errors.businessHead ? 'border-red-500' : 'border-gray-300'}`}
          >
            {getUsersByRole("Employee").length > 0 ? (
              getUsersByRole("Employee").map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email})
                </option>
              ))
            ) : (
              <option value="" disabled>No employees found</option>
            )}
          </select>
          <div className="text-sm text-gray-600 mt-1">
            Hold Ctrl/Cmd to select multiple
          </div>
          <div className="text-sm mt-1">
            Selected: {displaySelectedValues(formData.businessHead)}
          </div>
          {errors.businessHead && <p className="text-red-500 text-sm mt-1">{errors.businessHead}</p>}
        </div>

        {/* Project Heads */}
        <div>
          <label className="block text-sm font-medium mb-1">Project Head(s) *</label>
          <select
            name="projectHead"
            multiple
            value={formData.projectHead}
            onChange={handleMultiSelectChange}
            className={`w-full border p-2 rounded h-32 ${errors.projectHead ? 'border-red-500' : 'border-gray-300'}`}
          >
            {getUsersByRole("Employee").length > 0 ? (
              getUsersByRole("Employee").map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email})
                </option>
              ))
            ) : (
              <option value="" disabled>No employees found</option>
            )}
          </select>
          <div className="text-sm text-gray-600 mt-1">
            Hold Ctrl/Cmd to select multiple
          </div>
          <div className="text-sm mt-1">
            Selected: {displaySelectedValues(formData.projectHead)}
          </div>
          {errors.projectHead && <p className="text-red-500 text-sm mt-1">{errors.projectHead}</p>}
        </div>

        {/* Inverter Details */}
        <div className="border p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Inverter Details *</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Brand</label>
              <input
                type="text"
                name="inverterData.brand"
                value={formData.inverterData.brand}
                onChange={handleChange}
                className={`w-full border p-2 rounded ${errors.inverter ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., SMA, ABB, Luminous"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Model</label>
              <input
                type="text"
                name="inverterData.model"
                value={formData.inverterData.model}
                onChange={handleChange}
                className={`w-full border p-2 rounded ${errors.inverter ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Serial Number</label>
              <input
                type="text"
                name="inverterData.serialNumber"
                value={formData.inverterData.serialNumber}
                onChange={handleChange}
                className={`w-full border p-2 rounded ${errors.inverter ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Capacity (W)</label>
              <input
                type="number"
                name="inverterData.capacity"
                value={formData.inverterData.capacity}
                onChange={handleChange}
                className={`w-full border p-2 rounded ${errors.inverter ? 'border-red-500' : 'border-gray-300'}`}
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Technology Type</label>
              <select
                name="inverterData.technologyType"
                value={formData.inverterData.technologyType}
                onChange={handleChange}
                className="w-full border p-2 rounded border-gray-300"
              >
                <option value="">Select Technology Type</option>
                {technologyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Grid Type</label>
              <select
                name="inverterData.gridType"
                value={formData.inverterData.gridType}
                onChange={handleChange}
                className="w-full border p-2 rounded border-gray-300"
              >
                <option value="">Select Grid Type</option>
                {gridTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Warranty (Years)</label>
              <input
                type="number"
                name="inverterData.warrantyYears"
                value={formData.inverterData.warrantyYears}
                onChange={handleChange}
                className="w-full border p-2 rounded border-gray-300"
                min="0"
              />
            </div>
          </div>
          {errors.inverter && <p className="text-red-500 text-sm mt-1">{errors.inverter}</p>}
        </div>

        {/* Panels Details */}
        <div className="border p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Panel Details *</h3>
          {formData.panelsData.map((panel, index) => (
            <div key={index} className="mb-4 p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Panel {index + 1}</h4>
                {formData.panelsData.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePanel(index)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={panel.brand}
                    onChange={(e) => handlePanelChange(index, e)}
                    className={`w-full border p-2 rounded ${errors.panelErrors && errors.panelErrors[index] ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Model</label>
                  <input
                    type="text"
                    name="model"
                    value={panel.model}
                    onChange={(e) => handlePanelChange(index, e)}
                    className={`w-full border p-2 rounded ${errors.panelErrors && errors.panelErrors[index] ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Serial Number</label>
                  <input
                    type="text"
                    name="serialNumber"
                    value={panel.serialNumber}
                    onChange={(e) => handlePanelChange(index, e)}
                    className={`w-full border p-2 rounded ${errors.panelErrors && errors.panelErrors[index] ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Capacity (W)</label>
                  <input
                    type="number"
                    name="capacity"
                    value={panel.capacity}
                    onChange={(e) => handlePanelChange(index, e)}
                    className={`w-full border p-2 rounded ${errors.panelErrors && errors.panelErrors[index] ? 'border-red-500' : 'border-gray-300'}`}
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Efficiency (%)</label>
                  <input
                    type="number"
                    name="efficiency"
                    value={panel.efficiency}
                    onChange={(e) => handlePanelChange(index, e)}
                    className="w-full border p-2 rounded border-gray-300"
                    step="0.01"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Warranty (Years)</label>
                  <input
                    type="number"
                    name="warrantyYears"
                    value={panel.warrantyYears}
                    onChange={(e) => handlePanelChange(index, e)}
                    className="w-full border p-2 rounded border-gray-300"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    name="type"
                    value={panel.type}
                    onChange={(e) => handlePanelChange(index, e)}
                    className="w-full border p-2 rounded border-gray-300"
                  >
                    <option value="">Select Panel Type</option>
                    {panelTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              {errors.panelErrors && errors.panelErrors[index] && (
                <p className="text-red-500 text-sm mt-1">{errors.panelErrors[index]}</p>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addPanel}
            className="mt-2 bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm"
          >
            + Add Another Panel
          </button>
          {errors.panels && <p className="text-red-500 text-sm mt-1">{errors.panels}</p>}
        </div>

        {/* Project Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Project Type</label>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full border p-2 rounded border-gray-300"
          >
            <option value="">Select Project Type</option>
            <option value="On-Grid">On-Grid</option>
            <option value="Off-Grid">Off-Grid</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Capacity */}
        <div>
          <label className="block text-sm font-medium mb-1">Total Capacity (kW) *</label>
          <input
            type="number"
            name="capacityKW"
            value={formData.capacityKW}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.capacityKW ? 'border-red-500' : 'border-gray-300'}`}
            required
            min="0.01"
            step="0.01"
          />
          {errors.capacityKW && <p className="text-red-500 text-sm mt-1">{errors.capacityKW}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded border-gray-300"
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border p-2 rounded border-gray-300"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white px-6 py-3 rounded font-medium ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        >
          {loading ? 'Creating Project...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
};

export default CreateProject;