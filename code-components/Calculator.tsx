"use client"
import CustomText from '../components/Text';
import React, { lazy, useEffect, useState } from 'react';
const CustomInput = lazy(() => import('../components/Input'));

export interface CalculatorProps {
    children?: React.ReactNode;
    className?: string;
    verbose?: boolean;
}

const CalculatorComponent = ({
    className,
}: CalculatorProps) => {
    const [developmentCost, setdevelopmentCost] = useState(0)
    const [perUnitPrice, setperUnitPrice] = useState(0)
    const [unitPurchased, setUnitPurchased] = useState(0)
    const [gigaByte, setgigaByte] = useState(0)
    const [computingResourceCost, setComputingResourceCost] = useState(0)
    const [totalCost, setTotalCost] = useState(0);
    const [scrappingType, setScrappingType] = useState("")
    const [scrapPerMonth, setScrapPerMonth] = useState(0);
    const [totalProxyCost, setTotalProxyCost] = useState(0);
    const [gbDataScrapPerMonth, setgbDataScrapPerMonth] = useState(0);
    const [costType, setCostType] = useState("ResidentialProxy")

    useEffect(() => {
        const calculateTotalCosts = () => {
            const totalProxyCost = perUnitPrice * unitPurchased;
            const totalCosts = computingResourceCost + totalProxyCost + developmentCost;
            setTotalCost(totalCosts);
        };
        calculateTotalCosts();
    }, [perUnitPrice, unitPurchased, computingResourceCost, developmentCost, setTotalCost]);

    useEffect(() => {
        const handleWheel = (e: any) => {
            e.preventDefault();
        };
        const proxyInputs = document.querySelectorAll('.proxy-input');
        proxyInputs.forEach((input) => {
            input.addEventListener('wheel', handleWheel);
        });

        return () => {
            proxyInputs.forEach((input) => {
                input.removeEventListener('wheel', handleWheel);
            });
        };
    }, []);


    return (
        <div className={`${className}`}>
            <form className="calculator-form new-calculator" onSubmit={(e) => e.preventDefault()}>

                <div className='part1'>
                    <CustomText className='section-heading lightBlue' text="Part I: Calculating Individual Costs" />
                    <CustomText className='question' text="1. What is your monthly computing resource cost?" />
                    <div className="calculate-row">

                        <div className="calculator-inputbox pl-4">
                            <CustomInput
                                onChange={setComputingResourceCost}
                                value={computingResourceCost}
                                placeholder=""
                                type="number" />
                            <label>e.g. AWS, Azure, or related cost</label><br />
                        </div>
                    </div>

                    <div className="radio-section">
                        <CustomText text="(1a.) Do you use cURL-like requests or browser-based tools for scraping?" />
                        <div className='pl-30px'>
                            <input type="radio" id="curl" name="fav_language" value="curl" onChange={(e) => setScrappingType(e.target.value)} />
                            <label htmlFor="curl">cURL</label><br />
                            <input type="radio" id="browser" name="fav_language" value="browser" onChange={(e) => setScrappingType(e.target.value)} />
                            <label htmlFor="browser">Browser</label><br />
                        </div>
                    </div>


                    <CustomText className='question' text="2. What are your total proxy costs?" />
                    <div className='pl-4'>
                        <div className="calculate-row">
                            <div className='three-fields responsive'>
                                <div className="calculator-inputbox">
                                    <input
                                        onChange={(e) => {
                                            e.target.value === '' ? setperUnitPrice(0) : setperUnitPrice(parseFloat(e.target.value))
                                            setTotalProxyCost(parseFloat(e.target.value) * unitPurchased)
                                        }}

                                        value={perUnitPrice === 0 || isNaN(perUnitPrice) ? '' : perUnitPrice}
                                        type="number"
                                        className='proxy-input'
                                    />
                                    <label>Price per unit</label>
                                </div>
                                <span>*</span>
                                <div className="calculator-inputbox">
                                    <input
                                        onChange={(e) => {
                                            e.target.value === '' ? setUnitPurchased(0) : setUnitPurchased(parseFloat(e.target.value))
                                            setTotalProxyCost(parseFloat(e.target.value) * perUnitPrice)
                                        }}
                                        value={unitPurchased === 0 || isNaN(unitPurchased) ? '' : unitPurchased}
                                        type="number"
                                        className='proxy-input'
                                    />
                                    <label>Units purchased</label>
                                </div>
                                <span>=</span>
                                <div className="calculator-inputbox">
                                    <input
                                        className="proxy-input"
                                        value={isNaN(totalProxyCost) ? '' : totalProxyCost}
                                        readOnly
                                    />
                                    <label>Total cost</label>
                                </div>
                            </div>

                        </div>
                        <div className='sample-costs'>
                            <h4> Sample costs for enterprise scraping</h4>
                            <div className='subdiv'>
                                <div>
                                    <p>Static data center</p>
                                    <p>Rotating data center</p>
                                    <p>ISP (aka “Static Residential”)</p>
                                    <p>Rotating Residential</p>
                                    <p>Mobile</p>
                                </div>
                                <div>
                                    <p>$1.50 per IP</p>
                                    <p>$0.50 per GB</p>
                                    <p>$3.00 per IP</p>
                                    <p> $3.00 per GB</p>
                                    <p>$20.00 per GB</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="radio-section">
                        <CustomText className='mb-0' text="(2a.) How many gigabytes of data do you scrape in a given month?" />
                        <div className='pl-30px'>
                            <div className="calculate-row">
                                <CustomInput
                                    onChange={setgbDataScrapPerMonth}
                                    value={gbDataScrapPerMonth}
                                    placeholder=""
                                    type="number" />
                            </div>
                        </div>
                    </div>

                    <CustomText className='question' text="3. What are your monthly development resource costs?" />
                    <div className="calculate-row pl-4">
                        <div className="calculator-inputbox">
                            <CustomInput
                                onChange={setdevelopmentCost}
                                value={developmentCost}
                                placeholder=""
                                type="number" />
                        </div>
                    </div>

                    <CustomText className='question' text="4. How many scrapes do you do per month?" />
                    <div className="calculate-row pl-4">
                        <div className="calculator-inputbox">
                            <CustomInput
                                onChange={setScrapPerMonth}
                                value={scrapPerMonth}
                                placeholder=""
                                type="number" />
                        </div>
                    </div>
                </div>

                <div className='part2'>
                    <CustomText className='section-heading pink' text="Part II: Calculating Cost-Per-Scrape" />
                    <CustomText className='question' text="5. Calculate your total costs in a given month:" />
                    <div className="calculate-row pl-4">
                        <div className='four-fields responsive'>

                            <div className="calculator-inputbox">
                                <input
                                    className="proxy-input"
                                    readOnly
                                    value={isNaN(computingResourceCost) ? 0 : computingResourceCost}
                                />
                                <label>Answer to question 1</label><br />
                            </div>
                            <span>+</span>
                            <div className="calculator-inputbox">
                                <input
                                    className="proxy-input"
                                    readOnly
                                    value={isNaN(unitPurchased * perUnitPrice) ? 0 : unitPurchased * perUnitPrice}
                                />
                                <label>Answer to question 2</label><br />
                            </div>
                            <span>+</span>
                            <div className="calculator-inputbox">
                                <input
                                    className="proxy-input"
                                    readOnly
                                    value={isNaN(developmentCost) ? 0 : developmentCost}
                                />
                                <label>Answer to question 3</label><br />
                            </div>
                            <span>=</span>
                            <div className="calculator-inputbox">
                                <input
                                    className="proxy-input"
                                    readOnly
                                    value={isNaN(totalCost) ? 0 : totalCost}
                                />
                                <label>Total cost per month</label><br />
                            </div>
                        </div>
                    </div>
                    <CustomText className='question' text="6. Calculate your cost-per-scrape using the answers to previous questions:" />
                    <div className="calculate-row pl-4">
                        <div className='three-fields responsive'>
                            <div className="calculator-inputbox">
                                <input
                                    value={totalCost === 0 ? '' : totalCost}
                                    readOnly
                                    className='proxy-input'
                                />
                                <label>Answer to question 5 </label>
                            </div>
                            <span>÷</span>
                            <div className="calculator-inputbox">
                                <input
                                    readOnly
                                    value={scrapPerMonth === 0 ? '' : scrapPerMonth}
                                    className='proxy-input'
                                />
                                <label>Answer to question 4</label>
                            </div>
                            <span>=</span>
                            <div className="calculator-inputbox">
                                <input
                                    className="custom-highlighted-input"
                                    value={isNaN(totalCost / scrapPerMonth) || totalCost / scrapPerMonth === Infinity ? 0 : totalCost / scrapPerMonth}
                                    readOnly
                                />
                                <label>Cost per scrape per month</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='part3'>
                    <CustomText className='section-heading lightBlue' text="Part III: Modeling Proxy Cost Increase" />
                    <CustomText className='mb-15px text-white' text="Now imagine a scenario where you have to switch from data center proxies to residential proxies in
                        order to keep scraping your target site. Is your business model still going to be sustainable after
                        such a change? A simple calculation can help you gauge the increase in cost."/>
                    <div className='flex item-center md-row col'>
                        <CustomText className='question'>7. Calculate new proxy costs:</CustomText>
                        <select name="" id="" value={costType} onChange={(e) => setCostType(e.target.value)}>
                            <option value="">Select proxy type</option>
                            <option value="ResidentialProxy">Residential Proxy</option>
                            <option value="ISPProxy">ISP Proxy</option>
                            <option value="DataCenterProxy">Data Center Proxy</option>
                        </select>
                    </div>
                    <div className="calculate-row pl-4">
                        {costType !== "" && gigaByte !== 0 && !isNaN(gigaByte) ? "" : <CustomText className='errorClass' text="Fill the Residential cost per GB in order to calculate the Proxy cost increase" />}
                        <div className='three-fields responsive'>
                            <div className="calculator-inputbox">
                                <CustomInput
                                    onChange={setgigaByte}
                                    value={gigaByte}
                                    placeholder=""
                                    type="number" />
                                <label>Residential cost per GB </label>
                            </div>
                            <span>*</span>
                            <div className="calculator-inputbox">
                                <input
                                    readOnly
                                    value={costType === "ResidentialProxy" ? gbDataScrapPerMonth : unitPurchased}
                                    className='proxy-input'
                                />
                                <label>{costType === 'ResidentialProxy' ? 'Current GB consumption' : 'Number of IPs needed'}</label>
                            </div>
                            <span>=</span>
                            <div className="calculator-inputbox">
                                <input
                                    className="proxy-input"
                                    value={isNaN(gigaByte * (costType === "ResidentialProxy" ? gbDataScrapPerMonth : unitPurchased)) ? 0 : gigaByte * (costType === "ResidentialProxy" ? gbDataScrapPerMonth : unitPurchased)}
                                    readOnly
                                />
                                <label>Total cost per month</label>
                            </div>
                        </div>
                    </div>
                    <CustomText className='question' text="8. Calculate cost increase:" />
                    <div className="calculate-row pl-4">
                        <div className='three-fields responsive'>
                            <div className="calculator-inputbox">
                                <input
                                    readOnly
                                    value={isNaN(gigaByte * (costType === "ResidentialProxy" ? gbDataScrapPerMonth : unitPurchased)) ? 0 : gigaByte * (costType === "ResidentialProxy" ? gbDataScrapPerMonth : unitPurchased)}
                                    className='proxy-input'
                                />
                                <label>Answer to question 7</label>
                            </div>
                            <span>-</span>
                            <div className="calculator-inputbox">
                                <input
                                    readOnly
                                    value={isNaN(unitPurchased * perUnitPrice) ? 0 : unitPurchased * perUnitPrice}
                                    className='proxy-input'
                                />
                                <label>Current proxy costs</label>
                            </div>
                            <span>=</span>
                            <div className="calculator-inputbox">
                                <input
                                    className="proxy-input"
                                    value={isNaN((gigaByte * (costType === "ResidentialProxy" ? gbDataScrapPerMonth : unitPurchased)) - (unitPurchased * perUnitPrice)) ? 0 : (gigaByte * (costType === "ResidentialProxy" ? gbDataScrapPerMonth : unitPurchased)) - (unitPurchased * perUnitPrice)}
                                    readOnly
                                />
                                <label>Cost increase per month</label>
                            </div>
                        </div>
                    </div>
                    <CustomText className='question' text="9. Calculate your cost-per-scrape using the answers to previous questions:" />
                    <div className="calculate-row pl-4">
                        <div className='four-fields responsive'>
                            <div className="calculator-inputbox flex items-center">
                                <span>(</span>
                                <div>
                                    <input
                                        className="proxy-input"
                                        readOnly
                                        value={isNaN(totalCost) ? 0 : totalCost}
                                    />
                                    <label>Answer to question 5</label><br />
                                </div>
                            </div>
                            <span>+</span>
                            <div className="calculator-inputbox flex items-center">
                                <div>
                                    <input
                                        className="proxy-input"
                                        readOnly
                                        value={isNaN((gigaByte * (costType === "ResidentialProxy" ? gbDataScrapPerMonth : unitPurchased)) - (unitPurchased * perUnitPrice)) ? 0 : (gigaByte * (costType === "ResidentialProxy" ? gbDataScrapPerMonth : unitPurchased)) - (unitPurchased * perUnitPrice)}
                                    />
                                    <label>Answer to question 8</label><br />
                                </div>
                                <span>)</span>
                            </div>
                            <span>÷</span>
                            <div className="calculator-inputbox">
                                <input
                                    className="proxy-input"
                                    readOnly
                                    value={isNaN(scrapPerMonth) ? 0 : scrapPerMonth}
                                />
                                <label>Answer to question 4</label><br />
                            </div>
                            <span>=</span>
                            <div className="calculator-inputbox">
                                <input
                                    className="custom-highlighted-input"
                                    readOnly
                                    value={isNaN((totalCost + (gigaByte * (costType === "ResidentialProxy" ? gbDataScrapPerMonth : unitPurchased)) - (unitPurchased * perUnitPrice)) / scrapPerMonth) || (totalCost + (gigaByte * (costType === "ResidentialProxy" ? gbDataScrapPerMonth : unitPurchased)) - (unitPurchased * perUnitPrice)) / scrapPerMonth === Infinity ? 0 : (totalCost + (gigaByte * (costType === "ResidentialProxy" ? gbDataScrapPerMonth : unitPurchased)) - (unitPurchased * perUnitPrice)) / scrapPerMonth}
                                />
                                <label>New cost per scrape/month</label><br />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='part4'>
                    <CustomText className='section-heading pink' text="Part IV: Modeling Computing Cost Increase" />
                    <CustomText className='mb-15px text-white' text="Assume you are using cURL-like requests, requiring a tiny amount of computing resources per
                        scrape. Then, one day, your target site starts blocking you. It seems that it only accepts browserbased scraping now. If that happens, your total cost is going to increase by at least two factors of
                        magnitude. Let’s model this increase."/>
                    <CustomText className='question' text="10. Your current computing cost is:" />
                    <div className="calculate-row pl-4">
                        <div className="calculator-inputbox">
                            <input
                                value={isNaN(computingResourceCost) ? 0 : computingResourceCost}
                                readOnly
                                className='custom-highlighted-input' />
                            <label>Answer to question 1</label>
                        </div>
                    </div>
                    <CustomText className='question' text="11. Estimate the new computing cost cost:" />
                    <div className="calculate-row pl-4">
                        <div className='new-two-fields responsive'>
                            <div className="calculator-inputbox">
                                <input
                                    className="proxy-input"
                                    readOnly
                                    value={isNaN(computingResourceCost) ? 0 : computingResourceCost}
                                />
                                <label>Answer to question 10</label>
                            </div>
                            <span className='span-twofields'>* 100 =</span>
                            <div className="calculator-inputbox">
                                <input
                                    className="proxy-input"
                                    readOnly
                                    value={isNaN(computingResourceCost * 100) ? 0 : computingResourceCost * 100}
                                />
                                <label>Estimated new cost</label>
                            </div>
                        </div>
                    </div>
                    <CustomText className='question' text="12. Calculate cost increase:" />
                    <div className="calculate-row pl-4">
                        <div className='three-fields responsive'>
                            <div className="calculator-inputbox">
                                <input
                                    readOnly
                                    value={isNaN(computingResourceCost * 100) ? 0 : computingResourceCost * 100}
                                    className='proxy-input'
                                />
                                <label>Answer to question 11</label>
                            </div>
                            <span>-</span>
                            <div className="calculator-inputbox">
                                <input
                                    readOnly
                                    value={isNaN(computingResourceCost) ? 0 : computingResourceCost}
                                    className='proxy-input'
                                />
                                <label>Answer to question 10</label>
                            </div>
                            <span>=</span>
                            <div className="calculator-inputbox">
                                <input
                                    className="proxy-input"
                                    value={isNaN((computingResourceCost * 100) - computingResourceCost) ? 0 : (computingResourceCost * 100) - computingResourceCost}
                                    readOnly
                                />
                                <label>Cost increase per month</label>
                            </div>
                        </div>
                    </div>
                    <CustomText className='question' text="13. Calculate your cost-per-scrape using the answers to previous questions:" />
                    <div className="calculate-row pl-4">
                        <div className='four-fields responsive'>
                            <div className="calculator-inputbox flex items-center">
                                <span>(</span>
                                <div>
                                    <input
                                        className="proxy-input"
                                        readOnly
                                        value={isNaN(totalCost) ? 0 : totalCost}
                                    />
                                    <label>Answer to question 5</label><br />
                                </div>
                            </div>
                            <span>+</span>
                            <div className="calculator-inputbox flex items-center">
                                <div>
                                    <input
                                        className="proxy-input"
                                        readOnly
                                        value={isNaN((computingResourceCost * 100) - computingResourceCost) ? 0 : (computingResourceCost * 100) - computingResourceCost}
                                    />
                                    <label>Answer to question 12</label><br />
                                </div>
                                <span>)</span>
                            </div>
                            <span>÷</span>
                            <div className="calculator-inputbox">
                                <input
                                    className="proxy-input"
                                    readOnly
                                    value={isNaN(scrapPerMonth) ? 0 : scrapPerMonth}
                                />
                                <label>Answer to question 4</label><br />
                            </div>
                            <span>=</span>
                            <div className="calculator-inputbox">
                                <input
                                    className="custom-highlighted-input"
                                    readOnly
                                    value={isNaN((totalCost + (computingResourceCost * 100) - computingResourceCost) / scrapPerMonth) || (totalCost + (computingResourceCost * 100) - computingResourceCost) / scrapPerMonth === Infinity ? 0 : (totalCost + (computingResourceCost * 100) - computingResourceCost) / scrapPerMonth} />
                                <label>New cost per scrape/month</label><br />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CalculatorComponent;


