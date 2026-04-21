import React, { useState, useEffect } from "react";

const createField = (key = "", type = "text", value = "", children = []) => ({
  id: Math.random().toString(36).slice(2),
  key,
  type,
  value,
  children
});

/* ---------------- UPDATE HELPERS ---------------- */
const updateField = (list, id, updater) => {
  return list.map((f) => {
    if (f.id === id) return updater(f);
    if (f.children?.length) {
      const updatedChildren = updateField(f.children, id, updater);
      if (updatedChildren !== f.children) {
        return { ...f, children: updatedChildren };
      }
    }
    return f;
  });
};

const removeField = (list, id) => {
  const filtered = list.filter((f) => f.id !== id);
  if (filtered.length !== list.length) return filtered;

  return list.map((f) => {
    if (f.children?.length) {
      const updatedChildren = removeField(f.children, id);
      if (updatedChildren !== f.children) {
        return { ...f, children: updatedChildren };
      }
    }
    return f;
  });
};

const addChild = (list, id) =>
  list.map((f) => {
    if (f.id === id) {
      return {
        ...f,
        children: [...(f.children || []), createField()]
      };
    }
    if (f.children?.length) {
      const updatedChildren = addChild(f.children, id);
      if (updatedChildren !== f.children) {
        return { ...f, children: updatedChildren };
      }
    }
    return f;
  });

/* ---------------- JSON BUILDER & PARSER ---------------- */
const buildJSON = (list) => {
  const obj = {};
  list.forEach((f) => {
    if (!f.key && f.type !== "hidden") return;

    if (f.type === "object") {
      obj[f.key] = buildJSON(f.children);
    } else if (f.type === "array") {
      obj[f.key] = f.children.map((c) => c.value);
    } else {
      obj[f.key] = f.value;
    }
  });
  return obj;
};

const parseJSON = (obj) => {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
    return [createField()];
  }

  const fields = Object.entries(obj).map(([key, value]) => {
    if (Array.isArray(value)) {
      return createField(key, "array", "", value.map(v => createField("", "text", v)));
    } else if (value !== null && typeof value === "object") {
      return createField(key, "object", "", parseJSON(value));
    } else {
      return createField(key, typeof value === "number" ? "number" : "text", value);
    }
  });

  return fields.length > 0 ? fields : [createField()];
};

/* ---------------- VALIDATION ---------------- */
const getDuplicates = (fields) => {
  const keys = fields.map(f => f.key.trim()).filter(k => k !== "");
  return keys.filter((item, index) => keys.indexOf(item) !== index);
};

/* ---------------- FIELD UI ---------------- */
const Field = ({ field, depth = 0, setFields, updateTrigger, siblings = [], parentType = "object" }) => {
  const isDuplicate = siblings.filter(s => s.key === field.key && s.key !== "").length > 1;
  const isEmptyKey = field.key.trim() === "" && parentType !== "array";

  return (
    <div
      className={`bg-white border rounded-2xl p-4 mb-3 shadow-sm transition-all ${
        depth > 0 ? "ml-6 border-slate-200" : "border-slate-300 shadow-md"
      }`}
    >
      {/* HEADER */}
      <div className="flex gap-2 items-center">
        {parentType !== "array" && (
          <div className="flex-1 relative">
            <input
              className={`w-full px-3 py-2 border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none transition-colors ${
                (isEmptyKey || isDuplicate) ? "border-red-400 bg-red-50" : "border-slate-300 font-bold"
              }`}
              placeholder="Key"
              value={field.key}
              onBlur={updateTrigger}
              onChange={(e) =>
                setFields((prev) =>
                  updateField(prev, field.id, (f) => ({
                    ...f,
                    key: e.target.value
                  }))
                )
              }
            />
            {isDuplicate && <span className="absolute -top-6 left-0 text-[10px] text-red-500 font-bold uppercase tracking-tighter">Duplicate Key</span>}
            {isEmptyKey && <span className="absolute -top-6 left-0 text-[10px] text-red-400 font-bold uppercase tracking-tighter italic">Key Required</span>}
          </div>
        )}

        {parentType === "array" && (
          <div className="flex-1 text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
            Array Item
          </div>
        )}

        <select
          className="px-2 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 font-bold"
          value={field.type}
          onChange={(e) => {
            setFields((prev) =>
              updateField(prev, field.id, (f) => ({
                ...f,
                type: e.target.value,
                value: "",
                children: []
              }))
            );
            updateTrigger();
          }}
        >
          <option value="text">text</option>
          <option value="number">number</option>
          <option value="object">object</option>
          <option value="array">array</option>
        </select>

        <button
          type="button"
          className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
          onClick={() => {
            setFields((prev) => removeField(prev, field.id));
            updateTrigger();
          }}
        >
          ✕
        </button>
      </div>

      {/* VALUE */}
      {(field.type === "text" || field.type === "number") && (
        <div className="mt-2">
          <input
            className={`w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none ${
              field.value === "" ? "border-amber-200 bg-amber-50/30" : "border-slate-200"
            }`}
            placeholder="Value"
            type={field.type === "number" ? "number" : "text"}
            value={field.value}
            onBlur={updateTrigger}
            onChange={(e) =>
              setFields((prev) =>
                updateField(prev, field.id, (f) => ({
                  ...f,
                  value: e.target.value
                }))
              )
            }
          />
        </div>
      )}

      {/* OBJECT */}
      {field.type === "object" && (
        <div className="mt-3 border-l-2 border-indigo-200 pl-4 space-y-1">
          {field.children.map((child) => (
            <Field 
              key={child.id} 
              field={child} 
              depth={depth + 1} 
              setFields={setFields} 
              updateTrigger={updateTrigger}
              siblings={field.children}
              parentType="object"
            />
          ))}

          <button
            type="button"
            className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 mt-2 p-1 flex items-center gap-1"
            onClick={() => {
              setFields((prev) => addChild(prev, field.id));
              updateTrigger();
            }}
          >
            + Add Nested Field
          </button>
        </div>
      )}

      {/* ARRAY */}
      {field.type === "array" && (
        <div className="mt-3 border-l-2 border-emerald-200 pl-4 space-y-2">
          {field.children.map((item, i) => (
            <Field 
              key={item.id} 
              field={item} 
              depth={depth + 1} 
              setFields={setFields} 
              updateTrigger={updateTrigger}
              siblings={field.children}
              parentType="array"
            />
          ))}

          <button
            type="button"
            className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-800 mt-2 p-1 flex items-center gap-1"
            onClick={() => {
              setFields((prev) => addChild(prev, field.id));
              updateTrigger();
            }}
          >
            + Add Array Item
          </button>
        </div>
      )}
    </div>
  );
};

export default function DynamicJsonForm({ initialValue, onChange, title = "Form Section", subtitle = "Add and manage custom fields" }) {
  const [fields, setFields] = useState(() => {
    if (initialValue && Object.keys(initialValue).length > 0) {
      return parseJSON(initialValue);
    }
    return [createField()];
  });

  const handleUpdate = () => {
    const json = buildJSON(fields);
    if (onChange) onChange(json);
  };

  return (
    <div className="w-full bg-slate-50/50 rounded-[2.5rem] p-8 border border-slate-200 shadow-inner">
      <div className="flex justify-between items-center mb-6 px-2 text-left">
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800">
            {title}
          </h2>
          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{subtitle}</p>
        </div>
        <div className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-tighter">
          Dynamic Serializer Active
        </div>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {fields.map((f) => (
          <Field 
            key={f.id} 
            field={f} 
            setFields={setFields} 
            updateTrigger={handleUpdate} 
            siblings={fields}
            parentType="object"
          />
        ))}
      </div>

      <button
        type="button"
        className="mt-8 w-full bg-white hover:bg-slate-900 hover:text-white text-slate-800 border-2 border-slate-200 px-6 py-4 rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-sm hover:shadow-xl flex items-center justify-center gap-2"
        onClick={() => {
          setFields([...fields, createField()]);
          handleUpdate();
        }}
      >
        <span>+ Add Root Anchor</span>
      </button>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
      `}} />
    </div>
  );
}