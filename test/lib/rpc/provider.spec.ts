import axios from "axios"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { Provider } from "../../../src/lib/rpc/provider"
import { Methods } from "../../../src/lib/rpc/types"

describe("provider", () => {
	describe("nextUrl", () => {
		it.todo("should return the default enpoint when no url is passed")
		it.todo("should return the default enpoint when an empty array is passed")
		it.todo("should return a random url when an array of urls is passed")
	})

	describe("callApiMethod method", () => {
		vi.mock("axios")

		let instance: Provider

		beforeEach(() => {
			instance = new Provider()
			instance.nextURL = vi.fn(() => "https://rpc-01.witnet.io")
			// instance._headers = { Authorization: 'Bearer mockToken' };
		})

		it("should return the API result on success", async () => {
			const mockResponse = { data: { result: "success" } }
			axios.post.mockResolvedValue(mockResponse)

			const result = await instance.callApiMethod("method", { key: "value" })
			expect(result).toBe("success")

			expect(axios.post).toHaveBeenCalledWith(
				"https://rpc-01.witnet.io",
				{
					jsonrpc: "2.0",
					id: expect.any(Number),
					method: "method",
					params: { key: "value" },
				},
				// FIXME: This is been evaluated as {}
				{ headers: instance._headers },
			)
		})

		it("should throw ProviderError on API error", async () => {
			const mockError = { data: { error: "API error" } }
			axios.post.mockResolvedValue(mockError)

			await expect(instance.callApiMethod("method")).rejects.toThrow(
				"API error",
			)
		})

		it("should handle network errors", async () => {
			axios.post.mockRejectedValue(new Error("Network error"))

			await expect(instance.callApiMethod("method")).rejects.toThrow(
				"Network error",
			)
		})
	})

    describe.todo("blocks")

    describe.todo("constants")

    describe.todo("holders")

    describe.todo("knownPeers")

    describe.todo("mempool")

    describe.todo("priorities")

    describe.todo("protocolInfo")

    describe.todo("powers")

    describe.todo("stakes")

    describe.todo("syncStatus")

    describe.todo("wips")

    describe.todo("getBalance")

    describe.todo("getBlock")

    describe.todo("getDataRequest")

    describe.todo("getSuperblock")

    describe.todo("getTransaction")

    describe.todo("getTransactionReceipt")

    describe.todo("getUtxoInfo")

    describe.todo("sendRawTransaction")

	describe("getBalance method", () => {
		let instance: Provider

		beforeEach(() => {
			instance = new Provider()
			instance.callApiMethod = vi.fn() // Mock callApiMethod
		})

		it("should call callApiMethod with correct parameters", async () => {
			const mockBalance = { amount: 1000 }
			instance.callApiMethod.mockResolvedValue(mockBalance)

			const pkh = "wit10qvy79pcqt3nxfta0s8x6e7904muxe9wg5a6xk"
			const result = await instance.getBalance(pkh)

			expect(instance.callApiMethod).toHaveBeenCalledWith(Methods.GetBalance2, {
				pkh,
			})
			expect(result).toBe(mockBalance)
		})

		it("should handle errors from callApiMethod", async () => {
			instance.callApiMethod.mockRejectedValue(new Error("API failure"))

			await expect(instance.getBalance("tz1MockPublicKeyHash")).rejects.toThrow(
				"API failure",
			)
		})
	})
})
