"use strict"

class NodeBEBinaryStream {
  constructor(buffer = Buffer.alloc(0), offset = 0) {
    this.buffer = buffer;
    this.offset = offset;
    
    this._encoding = "utf8";
  }
  
  reset() {
    this.buffer = Buffer.alloc(0);
    this.offset = 0;
  }
  
  getBuffer() {
    return this.buffer;
  }
  
  getOffset() {
    return this.offset;
  }
  
  setBuffer(buffer = Buffer.alloc(0), offset = 0) {
    this.buffer = buffer;
    this.offset = offset;
  }
  
  setOffset(offset = 0) {
    this.offset = offset;
  }
  
  rewind() {
    this.offset = 0;
  }
  
  feof() {
    return this.offset >= buf.length;
  }
  
  entries() {
    return this.buffer.entries();
  }
  
  readData(offset = this.offset, length) {
    if(length === 0) {
      return "ERROR: PROVIDE LENGTH";
    }
    
    return this.buffer.slice(offset, length);
  }
  
  _readData(length) {
    if(length === 0) {
      return "ERROR: PROVIDE LENGTH";
    }
    
    return this.buffer.slice(this.offset, this._offsetChange(length));
  }
  
  _offsetChange(v) {
    return (v === true ? (this.offset += value) : (this.offset += v) - v);
  }
  
  writeData(buf) {
    if(Buffer.isBuffer(buf)) {
      this._append(buf);
    } else if(Array.isArray(buf)) {
      buf = Buffer.from(buf);
      this._append(buf);
    } else if(buf instanceof Buffer) {
      this._append(buf);
    } else if(typeof buf === "string") {
      buf = Buffer.from(buf);
      this._append(buf);
    } else if(typeof buf === "number") {
      buf = Buffer.from(buf.toString());
      this._append(buf);
    } else if(typeof buf === "object") {
      buf = Buffer.from(buf);
      this._append(buf);
    }
    return this;
  }
    
  _append(buf) {
    this.buffer = Buffer.concat([this.buffer, buf]);
    this.offset += buf.length;
    return this;
  }
  
  toJSON() {
    return JSON.parse(this.buffer.toString());
  }
  
  toHex(buf) {
    return this.buffer.toString("hex");
  }
  
  toString(encoding = this._encoding, start = this.offset, end = this.buffer.length) {
    return this.buffer.toString(encoding, start, end);
  }
  
  get length() {
    return this.buffer.length;
  }
  
  getRemainingBytes() {
    return this.buffer.length - this.offset;
  }
  
  readRemaining() {
    return this.buffer.slice(this.buffer.length);
  }
  
  // Bool Methods  
  readBool(b) {
    return this.readByte(b) !== 0;
  }
  
  writeBool(b) {
    return this.writeByte(b === true ? 1 : 0);
  }
  
  
  // Byte Methods
  readByte(offset) {
    return this.buffer.readUInt8(offset);
  }
  
  writeByte(v, offset) {
    return this._writeByte(v, offset, "U");
  }
  
  readSignedByte(offset) {
    return this.buffer.readInt8(offset);
  }
  
  writeSignedByte(v, offset) {
    return this._writeByte(v, offset, "S");
  }
  
  _writeByte(v, offset, type) {
    let buf = Buffer.alloc(1);
    
    switch(type) {
      case "U":
      buf.writeUInt8(v, offset);
      break;
      
      case "S":
      buf.writeInt8(v, offset);
      break;
    }
    return this.writeData(buf);
  }
  
  
  // Short Methods 
  readShort(offset) {
    return this.buffer.readUInt16BE(offset);
  }
  
  writeShort(v, offset) {
    return this._writeShort(v, offset, "UBE");
  }
  
  readSignedShort(offset) {
    return this.buffer.readInt16BE(offset);
  }
  
  writeSignedShort(v, offset) {
    return this._writeShort(v, offset, "SBE");
  }
  
  readLShort(offset) {
    return this.buffer.readUInt16LE(offset);
  }
  
  writeLShort(v, offset) {
    return this._writeShort(v, offset, "ULE");
  }
  
  readSignedLShort(offset) {
    return this.buffer.readInt16LE(offset);
  }
  
  writeSignedLShort(v, offset) {
    return this._writeShort(v, offset, "SLE");
  }
  
  _writeShort(v, offset, type) {
    let buf = Buffer.alloc(2);
    
    switch(type) {
      case "UBE":
      buf.writeUInt16BE(v, offset);
      break;
      
      case "SBE":
      buf.writeInt16BE(v, offset);
      break;
      
      case "ULE":
      buf.writeUInt16LE(v, offset);
      break;
      
      case "SLE":
      buf.writeInt16LE(v, offset);
      break;
    }
    return this.writeData(buf);
  }
  
  
  // Triad Methos
  readTriad(offset, byteLength = 3) {
    return this.buffer.readIntBE(offset, byteLength);
  }
  
  writeTriad(v, offset, byteLength) {
    return this._writeTriad(v, offset, byteLength, "BE");
  }
  
  readLTriad(offset, byteLength = 3) {
    return this.buffer.readLIntLE(offset, byteLength);
  }
  
  writeLTriad(v, offset, byteLength) {
    return this._writeTriad(v, offset, byteLength, "LE");
  }
  
  _writeTriad(v, offset, byteLength = 3, type) {
    let buf = Buffer.alloc(3);
    
    switch(type) {
      case "BE":
      buf.writeIntBE(v, offset, byteLength);
      break;
      
      case "LE":
      buf.writeIntLE(v, offset, byteLength);
      break;
    }
    return this.writeData(buf);
  }
  
  
  // Int Methods 
  readInt(offset) {
    return this.buffer.readInt32BE(offset);
  }
  
  writeInt(v, offset) {
    return this._writeInt(v, offset, "BE");
  }
  
  readLInt(offset) {
    return this.buffer.readInt32LE(offset);
  }
  
  writeLInt(v, offset) {
    return this._writeInt(v, offset, "LE");
  }
  
  _writeInt(v, offset, type) {
    let buf = Buffer.alloc(4);
    
    switch(type) {
      case "BE":
      buf.writeInt32BE(v, offset);
      break;
      
      case "LE":
      buf.writeInt32LE(v, offset);
      break;
    }
    return this.writeData(buf);
  }
  
  
  // Float Methos
  readFloat(offset) {
    return this.buffer.readFloatBE(offset);
  }
  
  readRoundedFloat() {}
  
  writeFloat(v, offset) {
    return this._writeFloat(v, offset, "BE");
  }
  
  readLFloat(offset) {
    return this.buffer.readFloatLE(offset);
  }
  
  readRoundedLFloat() {}
  
  writeLFloat(v, offset) {
    return this._writeFloat(v, offset, "LE");
  }
  
  _writeFloat(v, offset, type) {
    let buf = Buffer.alloc(8);
    
    switch(type) {
      case "BE":
      buf.writeFloatBE(v, offset);
      break;
      
      case "LE":
      buf.writeFloatLE(v, offset);
      break;
    }
    return this.writeData(buf);
  }  
  
  // Double Methods
  readDouble(offset) {
    return this.buffer.readDoubleBE(offset);
  }
  
  writeDouble(v, offset) {
    return this._writeDouble(v, offset, "BE");
  }
  
  readLDouble(offset) {
    return this.buffer.readDoubleLE(offset);
  }
  
  writeLDouble(v, offset) {
    return this._writeDouble(v, offset, "LE");
  }
  
  _writeDouble(v, offset, type) {
    let buf = Buffer.alloc(8);
    
    switch(type) {
      case "BE":
      buf.writeDoubleBE(v, offset);
      break;
      
      case "LE":
      buf.writeDoubleLE(v, offset);
      break;
    }
    return this.writeData(buf);
  }
  
  
  // Long Methods
  readLong(offset) {
    return this.buffer.readBigUInt64BE(offset);
  }
  
  writeLong(v, offset) {
    return this._writeLong(v, offset, "BE");
  }
  
  readLLong(offset) {
    return this.buffer.readBigUInt64LE(offset);
  }
  
  writeLLong(v, offset) {
    return this._writeLong(v, offset, "LE");
  }
  
  _writeLong(v, offset, type) {
    let buf = Buffer.alloc(8);
    v = BigInt(v);
    
    switch(type) {
      case "BE":
      buf.writeBigUInt64BE(v);
      break;
      
      case "LE":
      buf.writeBigUInt64LE(v);
      break;
    }
    return this.writeData(buf);
  }
  
  readUnsignedVarInt() {}
}

module.exports = NodeBEBinaryStream;