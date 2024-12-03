import React from "react";

const AuthImagePattern = ({ title, subtitle }) => {
    return (
        <div className="hidden lg:flex items-center justify-center bg-gray-790 p-12">
            <div className="max-w-md text-center">
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {[...Array(9)].map((_, i) => (
                        <div
                            key={i}
                            className="aspect-square rounded-2xl bg-primary/10 animate-pulseScale"
                            style={{
                                animationDelay: `${i * 0.2}s`, // Задержка анимации для каждого кубика
                            }}
                        />
                    ))}
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
                <p className="text-gray-400">{subtitle}</p>
            </div>
        </div>
    );
};

export default AuthImagePattern;






